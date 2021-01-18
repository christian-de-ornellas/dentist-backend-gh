import { Client } from '@models/Client'
import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'

class ImagesController {
  public async store(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const form = await formidable({ keepExtensions: true, multiples: true, uploadDir: `${process.env.TMP_PATH}`, maxFieldsSize: 10 * 1024 * 1024 }) // maxSize 10MB

      form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err)
          return
        }

        await Client.updateOne({ _id: req.query.clientId }, { $push: { files: files.image } })

        res.send({ fields, files })
      })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}

export default new ImagesController()
