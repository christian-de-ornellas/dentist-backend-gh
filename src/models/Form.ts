import { IForm } from '@interfaces/IForm'
import { Document, Model, model, Schema } from 'mongoose'
export interface FormModel extends IForm, Document {}
const FormSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const Form: Model<FormModel> = model<FormModel>('Form', FormSchema)
