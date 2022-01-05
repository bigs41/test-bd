/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import user from "App/Models/User";
import cert from "App/Models/CertConfig";
import Ot from "App/Models/Ot";
import Minio from "App/Utils/Minio";
import help from "App/Utils/Helper";
import Hash from '@ioc:Adonis/Core/Hash'
import _ from "lodash";
import moment from "moment";
import fs from "fs";
import path from "path";
import { v4 as uuid } from 'uuid'
import { createCanvas, loadImage } from 'canvas'


Route
  .group(() => {
    Route.post('/posts', 'TestsController.besic')
    Route.get('/create', async (ctx: HttpContextContract) => {
      const data = await user.all()
      return ctx.response.json(data)
    })
    Route.post('/cert', async ({ request, response }) => {
      const input = request.all()
      const coverImage = request.file('image')

      if (coverImage) {
        try {
          await Minio.uploadFile(`uploads/cert/${uuid()}.${coverImage.extname}`, coverImage.tmpPath)
        } catch (error) {
        }
        await coverImage.move('uploads/cert', { name: `${uuid()}.${coverImage.extname}` })

        // Minio
      }
      console.log(input);

      await cert.create(input)
      return response.json(input)
    })
    Route.get('/cert/:id/:user', async ({ response, params }) => {
      const themeSet: any = await cert.find(params.id);
      const userData: any = await user.find(params.user);

      const canvas = createCanvas(800, 600, 'pdf')
      const ctx = canvas.getContext('2d')
      //backgroup
      await loadImage(path.resolve(__dirname, '../asset/images/bg.jpg')).then((image) => {
        ctx.drawImage(image, 0, 0, 800, 600)
      })
      //logo
      await loadImage(path.resolve(__dirname, '../asset/images/logo.png')).then((image) => {
        ctx.drawImage(image, parseInt(themeSet.logo_x), 100 + parseInt(themeSet.logo_y), 100, 50)
      })
      await loadImage(path.resolve(__dirname, '../asset/images/qr.png')).then((image) => {
        ctx.drawImage(image, parseInt(themeSet.qr_x), 100 + 50 + parseInt(themeSet.qr_y), 100, 100)
      })
      console.log(themeSet);

      ctx.font = '25px tahoma'
      ctx.textAlign = "center";
      await ctx.fillText(`${userData.name} ${userData.lastname}`, 100 + parseInt(themeSet.name_x), 50 + parseInt(themeSet.name_y))
      return response.stream(canvas.createPDFStream())
      return response.json(themeSet)
    })
    Route.any('/callback', async (ctx: HttpContextContract) => {
      return ctx.response.json(ctx.request.all())
    })
    Route.any('/log', async (ctx: HttpContextContract) => {
      console.log(11111);

      return ctx.response.json(ctx.request.all())
    })

    Route.get('/login', async (ctx: HttpContextContract) => {
      const input: any = ctx.request.all()
      let data: any = await user.query().where('email', input.email).first()
      let chk: Boolean = false;
      const hashedValue = data.password
      data = JSON.parse(JSON.stringify(data))

      if (await Hash.verify(hashedValue, input.password)) {
        chk = true
      }
      data = _.merge({ chk }, data)
      return ctx.response.json(data)
    })
    Route.get('/toa', async (ctx: HttpContextContract) => {
      var data = await Ot.all()
      data = JSON.parse(JSON.stringify(data))
      var type: object = {
        hours: "ชั่วโมง", minutes: "นาที"
      }
      data = _.chain(data).map(time => {
        let min = help.durationTime(time.start, time.end)
        let hours = help.convertMiliseconds(min, 'h')
        let minutes = help.convertMiliseconds(min, 'm')
        time.duration = _.chain({ hours, minutes: minutes - ((hours * 60)) }).map((t, k) => {
          return `${t} ${type[k]}`
        }).join(' ')
        let dateStart = moment(time.start).format("YYYY-MM-DD")
        let timeStart = moment(time.start).format("HH:mm:ss")
        let dateEnd = moment(time.end).format("YYYY-MM-DD")
        let timeEnd = moment(time.end).format("HH:mm:ss")
        let date = _.chain([dateStart, dateEnd]).uniq().value()
        if (date.length >= 2) {
          date = _.join([moment(time.start).format("LLLL"), moment(time.end).format("LLLL")], ' ถึง ')
        } else {
          date = (moment(_.head(date)).format("LLLL")).replace('0:00', `${timeStart} ถึง ${timeEnd}`);
        }
        time.date = moment(time.start).format("MM/DD/YYYY")
        time.time = moment(time.start).format("HH:mm") + ' - ' + moment(time.end).format("HH:mm")
        time.dateStr = date
        time.miliseconds = min
        return time
      }).value()
      // return res.json('data')
      let total = _.sumBy(data, 'miliseconds')
      let hours = help.convertMiliseconds(total, 'h')
      let minutes = help.convertMiliseconds(total, 'm')

      total = _.chain({ hours, minutes: minutes - ((hours * 60)) }).map((t, k) => {

        return `${t} ${type[k]}`
      }).join(' ')
      let ot = (((23000 / 30) / 8) * 1) * help.getNumber(hours)
      return ctx.response.json({ total, ot, data })
    })
  })
  .prefix('/api')
// Route.get('/img/:path\/*', async ({ response, params }) => {
//   let p = [params['path']]
//   p = _.concat(p, params['*'])
//   return response.json(p)
// })
Route.get('/*', async ({ response }) => {
  const html = fs.createReadStream('./public/index.html')
  return response.stream(html)
})