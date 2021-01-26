import { Tusk } from '@models/Tusk'
import { Request, Response } from 'express'

class TusksController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { clientId } = req.query
      const tusks = await Tusk.find({ client: clientId })
      return res.send(tusks)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { title } = req.body

      if (await Tusk.findOne({ title })) {
        return res.status(400).send({ error: 'Tusk already exists!' })
      }

      await Tusk.create(req.body)
      return res.status(201).send({ message: 'Tusk created!' })
    } catch (error) {
      return res.status(400).send({ error })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await Tusk.deleteOne({ _id: req.params.id })
      return res.status(200).send({ message: 'Is tusk removed!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the Tusk!' })
    }
  }
}

export default new TusksController()
