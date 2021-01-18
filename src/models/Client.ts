import { IClient } from '@interfaces/IClient'
import { Document, Model, model, Schema } from 'mongoose'

export interface ClientModel extends IClient, Document {}

const ClientSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    genre: String,

    document: {
      type: Number,
      required: true,
    },

    birth: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phones: [
      {
        one: String,
        two: String,
      },
    ],

    father: {
      type: String,
    },

    mother: {
      type: String,
    },

    place: [
      {
        cep: Number,
        street: String,
        neighborhood: String,
        number: Number,
        complement: String,
        city: String,
        state: String,
      },
    ],
    bondsman: {
      parent: String,
      document: String,
      name: String,
    },
    files: [],
  },
  {
    timestamps: true,
  }
)

export const Client: Model<ClientModel> = model<ClientModel>('Client', ClientSchema)
