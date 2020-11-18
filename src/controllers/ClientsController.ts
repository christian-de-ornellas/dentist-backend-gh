import { Client } from '@models/Client'
import { Request, Response } from 'express'

class ClientsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await Client.find()
      return res.send(clients)
    } catch (e) {
      return res.status(500).send({ error: e.message })
    }
  }

  public async search(req: Request, res: Response): Promise<Response> {
    try {
      const { v } = req.query
      console.log(req.query)
      const clients = await Client.find({ firstName: v })
      return res.send(clients)
    } catch (e) {
      return res.status(500).send({ error: e.message })
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
      return res.status(500).send({ error: e.message })
    }
  }

  // public async login(req: Request, res: Response) {
  //   try {
  //     const { email, password } = req.body
  //     const user = await User.findOne({ email })

  //     if (!user) {
  //       return res.status(400).send({ error: 'User not found' })
  //     }

  //     if (!(await bcrypt.compare(password, user.password))) {
  //       return res.status(400).send({ error: 'Invalid password' })
  //     }

  //     user.password = undefined

  //     return res.status(200).send({ user, token: jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: 86400 }) })
  //   } catch (e) {
  //     return res.status(500).send({ error: e.message })
  //   }
  // }
}

export default new ClientsController()
