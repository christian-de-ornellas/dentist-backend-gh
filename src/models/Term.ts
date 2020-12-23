import { ITerm } from '@interfaces/ITerm'
import { Document, Model, model, Schema } from 'mongoose'
export interface TermModel extends ITerm, Document {}
const TermSchema = new Schema(
  {
    form: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      require: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      require: true,
    },

    term: String,
  },

  {
    timestamps: true,
  }
)

export const Term: Model<TermModel> = model<TermModel>('Term', TermSchema)
