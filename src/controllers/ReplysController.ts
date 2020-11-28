import { Request, Response } from 'express'
import { Reply } from '@models/Reply'

class ReplysController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const replys = await Reply.find().populate('question')
      return res.send(replys)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { question } = req.body

      if (await Reply.findOne({ question })) {
        return res.status(400).send({ error: 'Reply already exists!' })
      }

      const newReply = await Reply.create(req.body)
      return res.status(201).send({ message: 'Reply created!' })
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
}
export default new ReplysController()
