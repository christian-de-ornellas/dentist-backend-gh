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
    dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })
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
      useCreateIndex: true,
      dbName: process.env.DB_NAME,
      // useFindAndModify: false,
      // autoIndex: false, // Don't build indexes
      // poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 90000, // Keep trying to send operations for 5 seconds
      // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // family: 4, // Use IPv4, skip trying IPv6
    }
    const uri = `mongodb://${process.env.DB_HOST}`
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
