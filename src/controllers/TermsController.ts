import { Term } from '@models/Term'
import { Request, Response } from 'express'

class TermsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const terms = await Term.find({ form: req.query.form, client: req.query.client })
      return res.send(terms)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await Term.create({ ...req.body })
      return res.status(201).send({ message: 'Terms created!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Term.deleteOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is term removed!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }
}

export default new TermsController()
