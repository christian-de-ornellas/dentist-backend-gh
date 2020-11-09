import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
require("dotenv-safe").config();
import bodyParser from "body-parser";


import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
    this.parser()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/tsexample`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
  private parser (): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({extended: true}))
  }
}

export default new App().express
