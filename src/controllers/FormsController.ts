import { Form } from '@models/Form'
import { Request, Response } from 'express'

class FormsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const forms = await Form.find()
      return res.send(forms)
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { title } = req.body

      if (await Form.findOne({ title })) {
        return res.status(400).send({ error: 'Form already exists!' })
      }

      const newForm = await Form.create(req.body)
      return res.status(201).send({ message: 'Form created!' })
    } catch (error) {
      return res.status(400).send({ error })
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await Form.updateOne({ _id: id }, { ...req.body })
      return res.status(200).send({ message: 'Is form updated!' })
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await Form.deleteOne({ _id: req.params.id })
      return res.status(200).send({ message: 'Is form removed!' })
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: 'It was not possible to remove the user!' })
    }
  }
}

export default new FormsController()
