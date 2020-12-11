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

      const response = replys.length === 0 ? { message: 'No answer!' } : replys

      return res.send(response)
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
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Reply.updateOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is reply updated!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }
}
export default new ReplysController()
