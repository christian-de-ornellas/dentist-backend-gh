import { User } from '@models/User'
import * as bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

class AuthController {
  public async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      user.password = undefined

      return res.status(200).send({ user, token: jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: 86400 }) })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }
}

export default new AuthController()
