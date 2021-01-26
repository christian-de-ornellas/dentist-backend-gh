import bodyParser from 'body-parser'
import { errors } from 'celebrate'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor() {
    dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
    this.parser()
    this.celebrate()
    this.staticImages()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    mongoose.connect(uri, options)
  }

  private routes(): void {
    this.express.use(routes)
  }

  private parser(): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  private celebrate(): void {
    this.express.use(errors())
  }

  private staticImages(): void {
    this.express.use('/uploads', express.static('uploads'))
  }
}

export default new App().express
