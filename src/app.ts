import bodyParser from 'body-parser'
import { errors } from 'celebrate'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import * as dotenv from 'dotenv'

class App {
  public express: express.Application

  public constructor() {
    dotenv.config()
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
    this.parser()
    this.celebrate()
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
    const uri = 'mongodb://test:27017/dentistForm'
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
}

export default new App().express
