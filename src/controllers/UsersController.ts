import { User } from '@models/User'
import * as bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const offset = parseInt(req.query.offset)
      const limit = parseInt(req.query.limit)
      const users = await User.find()
        .select('-password')
        .skip(offset * limit)
        .limit(limit)
        .sort({ firstName: 1 })
      const total = await User.count()
      return res.send({ users, total, offset, limit })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, role } = req.body

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'User already exists!' })
      }

      if (role != 'admin' && role != 'mod') {
        return res.status(400).send({ error: 'User role cannot be different from admin or mod!' })
      }

      const user = await User.create(req.body)
      user.password = undefined

      res.status(201).send({ user, token: jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: 86400 }) })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { email, role, password } = req.body

      if (role && role != 'admin' && role && role != 'mod') {
        return res.status(400).send({ error: 'User role cannot be different from admin or mod!' })
      }

      if (email && (await User.findOne({ email }))) {
        return res.status(400).json({ error: 'User already exists!' })
      }

      if (password) {
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
      }

      await User.updateOne({ _id: req.params.id }, { ...req.body })

      res.status(200).send({ message: 'Is user updated!' })
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await User.deleteOne({ _id: req.params.id })
      return res.status(200).send({ message: 'Is user removed!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the user!' })
    }
  }

  public async search(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const users = await User.find({ _id: id })
      return res.send(users)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
}

export default new UsersController()
