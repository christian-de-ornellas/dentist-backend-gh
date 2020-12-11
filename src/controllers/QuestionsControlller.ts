import { Form } from '@models/Form'
import { Question } from '@models/Question'
import { Request, Response } from 'express'

class QuestionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const questions = await Question.find({ form: req.query.form_id })
      return res.send(questions)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async all(req: Request, res: Response): Promise<Response> {
    try {
      const questions = await Question.find()
      return res.send(questions)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await Question.create({ ...req.body })
      return res.status(201).send({ message: 'Question created!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error })
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Question.updateOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is question updated!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await Question.deleteOne({ _id: req.params.id })
      return res.status(200).send({ message: 'Is question removed!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the question!' })
    }
  }
}

export default new QuestionsController()
