(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{377:function(t,e,r){var content=r(394);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(17).default)("29c47864",content,!0,{sourceMap:!1})},393:function(t,e,r){"use strict";r(377)},394:function(t,e,r){var n=r(16)(!1);n.push([t.i,".cont[data-v-5ba461f2]{margin-left:100px;width:800px;height:600px;border:solid #000;background-color:#fff}#drag-1[data-v-5ba461f2]{width:25%;min-height:3em;margin:1rem 0 0 1rem;background-color:#29e;color:#fff;border-radius:.75em;padding:4%;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transform:translate(0)}#drag-2[data-v-5ba461f2]{height:50px}#drag-2[data-v-5ba461f2],#drag-3[data-v-5ba461f2]{width:100px;padding:.5%;background-color:#29e}#drag-3[data-v-5ba461f2]{height:100px}",""]),t.exports=n},422:function(t,e,r){"use strict";r.r(e);var n=r(27),o=(r(90),r(20),r(24),r(392)),d=r.n(o),c=r(105),l=r.n(c),f={data:function(){return{datafiles:null}},mounted:function(){this.initInteract(this.$refs.drag1),this.initInteract(this.$refs.drag2),this.initInteract(this.$refs.drag3)},methods:{readURL:function(t){return new Promise((function(e,r){var n=new FileReader;n.onload=function(t){e(t.target.result)},n.readAsDataURL(t)}))},save:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("image",t.datafiles),r.append("name_x",t.$refs.drag1.getAttribute("data-x")),r.append("name_y",t.$refs.drag1.getAttribute("data-y")),r.append("logo_x",t.$refs.drag2.getAttribute("data-x")),r.append("logo_y",t.$refs.drag2.getAttribute("data-y")),r.append("qr_x",t.$refs.drag3.getAttribute("data-x")),r.append("qr_y",t.$refs.drag3.getAttribute("data-y")),e.next=10,l.a.post("/api/cert",r,{headers:{"Content-Type":"multipart/form-data"}});case 10:e.sent;case 11:case"end":return e.stop()}}),e)})))()},previewFile:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=document.querySelector(t),o=e.datafiles,r.t0="url(",r.next=5,e.readURL(o);case 5:r.t1=r.sent,n.style.backgroundImage=r.t0.concat.call(r.t0,r.t1,")");case 7:case"end":return r.stop()}}),r)})))()},initInteract:function(t){d()(t).draggable({inertia:!0,restrict:{restriction:"parent",endOnly:!0,elementRect:{top:0,left:0,bottom:1,right:1}},autoScroll:!0,onmove:this.dragMoveListener,onend:this.onDragEnd})},dragMoveListener:function(t){var e=t.target,r=parseFloat(e.getAttribute("data-x"))+t.dx,n=parseFloat(e.getAttribute("data-y"))+t.dy;e.style.webkitTransform=e.style.transform="translate("+r+"px, "+n+"px)",e.setAttribute("data-x",r),e.setAttribute("data-y",n)},onDragEnd:function(t){var e=t.target;this.screenX=e.getBoundingClientRect().left,this.screenY=e.getBoundingClientRect().top}}},v=(r(393),r(81)),m=r(109),x=r.n(m),h=r(235),y=r(420),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{ref:"bgcert",staticClass:"cont",attrs:{id:"output"}},[r("div",{ref:"drag1",staticClass:"draggable",staticStyle:{transform:"translate(246px, 136px)"},attrs:{id:"drag-1","data-x":"246","data-y":"136"}},[t._v("\n      Draggable\n    ")]),t._v(" "),r("div",{ref:"drag2",staticClass:"draggable",staticStyle:{transform:"translate(12px, 299px)"},attrs:{id:"drag-2","data-x":"12","data-y":"299"}},[t._v("\n      logo\n    ")]),t._v(" "),r("div",{ref:"drag3",staticClass:"draggable",staticStyle:{transform:"translate(662px, 178px)"},attrs:{id:"drag-3","data-x":"662","data-y":"178"}},[t._v("\n      qr\n    ")])]),t._v(" "),r("v-file-input",{attrs:{accept:"image/*",label:"File input"},on:{change:function(e){return t.previewFile("#output")}},model:{value:t.datafiles,callback:function(e){t.datafiles=e},expression:"datafiles"}}),t._v(" "),r("v-btn",{on:{click:t.save}},[t._v("xxxx")])],1)}),[],!1,null,"5ba461f2",null);e.default=component.exports;x()(component,{VBtn:h.a,VFileInput:y.a})}}]);