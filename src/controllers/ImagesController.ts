import { Client } from '@models/Client'
import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import fs from 'fs'

class ImagesController {
  public async store(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const form = await formidable({
        allowEmptyFiles: false,
        keepExtensions: true,
        multiples: true,
        uploadDir: `${process.env.TMP_PATH}`,
        maxFieldsSize: 5 * 1024 * 1024,
      }) // maxSize: 5MB

      form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err)
          return
        }

        await Client.updateOne({ _id: req.query.clientId }, { $push: { files: [files.image.path] } })

        res.send({ fields, files })
      })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { clientId, image } = req.query

      const client = await Client.findOne({ _id: clientId })
      const files = await client.files

      if (files) {
        files.splice(files.indexOf(image), 1)
        fs.unlinkSync(`uploads/${image}`)
        await Client.updateOne({ _id: clientId }, { $set: { files } })
      }

      res.status(200).send({ message: 'Is image removed!' })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}

export default new ImagesController()
