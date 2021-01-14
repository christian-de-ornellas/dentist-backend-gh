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

  public async answers(req: Request, res: Response): Promise<Response> {
    try {
      const { form } = req.query
      const offset = parseInt(req.query.offset)
      const limit = parseInt(req.query.limit)

      const replys = await Reply.find({ form })
        .populate('client')
        .skip(offset * limit)
        .limit(limit)
      const total = await Reply.count()

      const response = replys.length === 0 ? { message: 'No answer!' } : replys

      return res.send({ response, offset, limit, total })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { client, question, form, answer } = req.body
      const searchClientAnswers = await Reply.find({ $and: [{ question }, { client }, { form }, { 'answer.subAnswer': { $eq: answer.subAnswer } }] })

      // Uma questão pode ter até no máximo 1 resposta e 1 sub resposta.
      if (searchClientAnswers.length > 0) {
        return res.status(403).send({ message: 'Answered form!' })
      } else {
        await Reply.create(req.body)
        return res.status(201).send({ message: 'Reply created!' })
      }
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Reply.deleteOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is reply removed!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }
}
export default new ReplysController()
