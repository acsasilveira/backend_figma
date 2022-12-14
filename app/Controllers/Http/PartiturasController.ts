import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partitura from '../../Models/Partitura'
import PartituraValidator from '../../Validators/PartituraValidator'

export default class PartiturasController {
    public async index( { }: HttpContextContract){
        const partitura = await Partitura.all()
        return partitura
    }

    public async store( { request }: HttpContextContract) {
        const title = await request.validate(PartituraValidator)
        const partitura = await Partitura.create({...title})
        return partitura
    }

    public async show({ params }: HttpContextContract) {
       const partitura = await Partitura.findOrFail(params.id)
       return partitura
    }

    public async update({ request, params, response }: HttpContextContract) {
        const {title, ano, autor} = await request.validate(PartituraValidator)
        try{
            const partituras = await Partitura.findOrFail(params.id)
            partituras.title = title
            partituras.autor = autor
            partituras.ano = ano 
            await partituras.save()
            return partituras
        }
        catch (error){
            response.status(400).send("Dados não encontrados!!")
        }
    }

    public async destroy({ params, response }: HttpContextContract){
        try{
            const partituras = await Partitura.findOrFail(params.id)
            await partituras.delete()
            return partituras
        } catch (error) {
            response.status(400).send("Dados não encontrados")
        }
    }
}
