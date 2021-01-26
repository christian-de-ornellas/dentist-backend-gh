import { Client } from '@models/Client'
import { User } from '@models/User'
import { Request, Response } from 'express'

class ClientsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const offset = parseInt(req.query.offset)
      const limit = parseInt(req.query.limit)
      const clients = await Client.find()
        .skip(offset * limit)
        .limit(limit)
        .sort({ firstName: 1 })
      const total = await Client.countDocuments()
      return res.send({ clients, total, offset, limit })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async search(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const clients = await Client.find({ _id: id })
      return res.send(clients)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { document, email } = req.body

      if (await Client.findOne({ document })) {
        return res.status(400).send({ error: 'Client already exists!' })
      }

      if (await Client.findOne({ email })) {
        return res.status(400).send({ error: 'Email already exists!' })
      }

      const client = await Client.create(req.body)

      await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.bondsman.document,
        role: 'client',
      })

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
      const client = await Client.findOne({ _id: req.params.id })

      if (client) {
        const user = await User.findOne({ email: client.email })
        await User.deleteOne({ _id: user._id })
        await Client.deleteOne({ _id: req.params.id })
        return res.status(200).send({ message: 'Is client removed!' })
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the user!' })
    }
  }
}

export default new ClientsController()
