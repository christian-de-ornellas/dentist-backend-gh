import { Client } from '@models/Client'
import { Reply } from '@models/Reply'
import { User } from '@models/User'
import { Request, Response } from 'express'

class DashboardController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const usersCount = await User.count()
      const clientsCount = await Client.count()
      const formsAnwersCount = await Reply.count()

      return res.status(200).send({ usersCount, clientsCount, formsAnwersCount })
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
}
export default new DashboardController()
