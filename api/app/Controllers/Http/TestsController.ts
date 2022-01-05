// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {
    public async besic({ request, response }) {
        console.log(request.input('name'));

        return response.json({})
    }
}
