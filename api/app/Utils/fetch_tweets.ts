import _ from 'lodash'
import collect from 'collect.js'
import moment from 'moment'

export default {
    getBoolean(value) {
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
            case "YES":
            case "y":
            case "Y":
                return true;
            default:
                return false;
        }
    },
    /** 
     * เช็คข้อมูลหรือตัวแปร ว่า empty
     * @param {String} mixed_var ข้อมูลหรือตัวแปรที่ต้องการเช็ค
    **/
    empty(mixed_var: any) {
        if (!mixed_var || mixed_var == '0') {
            return true;
        }
        if (typeof mixed_var == 'object') {

            for (var k in mixed_var) {
                return false;
            }
            return true;
        }
        return false;
    },
    /** 
     * เช็คข้อมูลหรือตัวแปร ว่า empty
     * @param {Object} items ข้อมูล
     * @param {String} key ชื่อคีย์
     * @param {default} defaultData default return
    **/
    get(items: any, key: string, defaultData = undefined) {
        return !this.empty(_.get(items, key)) ? _.get(items, key, defaultData) : defaultData;
    },
    /** Usage:
    * @example
    * helper.buildTree(Array, {
    *       idKey: 'id',
    *       parentKey: 'parent',
    *       childrenKey: 'children'
    * })
    */
    buildTree(data: any, options: any) {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent';
        var CHILDREN_KEY = options.childrenKey || 'children';
        var matchs = CHILDREN_KEY.match(/(?<={{).*?(?=}})/g)
        var matchs_space = CHILDREN_KEY.match(/(?<=}}).*?(?={{)/g) || ''
        var tree = [],
            childrenOf = {};
        var item: any, id: any, parentId: any;
        if (!this.empty(matchs)) {
            CHILDREN_KEY = CHILDREN_KEY.replace(/{{(.*?)}}/g, '')
            CHILDREN_KEY = CHILDREN_KEY.replace(matchs_space, '')
        }
        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            // ทุกรายการอาจมีลูก
            childrenOf[id] = childrenOf[id] || [];
            // ริเริ่มเด็ก ๆ
            if (!this.empty(matchs)) {
                let $matchs = matchs.map(r => {
                    return item[r]
                }).join(matchs_space)

                item[`${CHILDREN_KEY}${$matchs}`] = childrenOf[id];
            } else {
                item[`${CHILDREN_KEY}`] = childrenOf[id];
            }
            if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        };
        return tree;
    },
    isNumeric(value: any) {
        return _.isNumber(value) || (!_.isEmpty(value) && !_.isNaN(value));
    },
    getNumber(s: any) {
        if (this.isNumeric(s)) {
            if (typeof s === 'string') {
                s = parseInt(s)
            }
        }
        return s;
    },
    durationTime(startTime, endTime, get = 'milliseconds') {
        var date1 = new Date(startTime).getTime();
        var date2 = new Date(endTime).getTime();
        var data = {}
        data["milliseconds"] = date2 - date1;
        data["minutes"] = Math.floor(data["milliseconds"] / 60000);
        data["hours"] = Math.floor(data["minutes"] / 60);
        data["days"] = Math.floor(data["hours"] / 24);
        data["year"] = Math.floor(data["days"] / 365);
        return data[get]
    },
    convertMiliseconds(miliseconds: any, format: any) {
        var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

        total_seconds = parseInt(Math.floor(miliseconds / 1000));
        total_minutes = parseInt(Math.floor(total_seconds / 60));
        total_hours = parseInt(Math.floor(total_minutes / 60));
        days = parseInt(Math.floor(total_hours / 24));

        seconds = parseInt(total_seconds % 60);
        minutes = parseInt(total_minutes % 60);
        hours = parseInt(total_hours % 24);

        switch (format) {
            case 's':
                return total_seconds;
            case 'm':
                return total_minutes;
            case 'h':
                return total_hours;
            case 'd':
                return days;
            default:
                return { d: days, h: hours, m: minutes, s: seconds };
        }
    }
}