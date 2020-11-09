import { Request, Response } from 'express'

class MainController {
  public index(req: Request, res: Response): object {
    const main = { name: 'Dentist Form API', author: 'Orient Me', private: true, version: process.env.APP_VERSION }
    return res.json(main)
  }
}
export default new MainController()
