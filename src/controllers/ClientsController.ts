import { Client } from '@models/Client'
import { Request, Response } from 'express'

class ClientsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await Client.find()
      return res.send(clients)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async search(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      console.log(req.query)
      const clients = await Client.find({ _id: id })
      return res.send(clients)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { document } = req.body

      if (await Client.findOne({ document })) {
        return res.status(400).send({ error: 'Client already exists!' })
      }

      const client = await Client.create(req.body)
      return res.status(201).send({ client })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Client.updateOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is client updated!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await Client.deleteOne({ _id: req.params.id })
      return res.status(200).send({ message: 'Is client removed!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the user!' })
    }
  }
}

export default new ClientsController()
