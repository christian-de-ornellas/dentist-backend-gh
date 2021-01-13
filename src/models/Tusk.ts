import { ITusk } from '@interfaces/ITusk'
import { Document, Model, model, Schema } from 'mongoose'
export interface TuskModel extends ITusk, Document {}
const TuskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      require: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
)

export const Tusk: Model<TuskModel> = model<TuskModel>('Tusk', TuskSchema)
