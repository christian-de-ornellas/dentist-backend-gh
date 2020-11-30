import { Reply } from '@models/Reply'
import { Request, Response } from 'express'

class ReplysController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { form, client } = req.query
      const replys = await Reply.find({ $and: [{ form }, { client }] })
        .populate('question')
        .populate('client')
        .populate('form')
      return res.send(replys)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await Reply.create(req.body)
      return res.status(201).send({ message: 'Reply created!' })
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
}
export default new ReplysController()