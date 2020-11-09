/* eslint-disable no-unused-vars */
import { User } from '@models/User'
import * as bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()
      return res.send(users)
    } catch (e) {
      return res.status(500).send({ error: e.message })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'User already exists!' })
      }
      const user = await User.create(req.body)
      user.password = undefined
      res.status(201).send({ user, token: jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: 86400 }) })
    } catch (e) {
      return res.status(500).send({ error: e.message })
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      return res.status(200).send({ user, token: jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: 86400 }) })
    } catch (e) {
      return res.status(500).send({ error: e.message })
    }
  }
}

export default new UserController()
