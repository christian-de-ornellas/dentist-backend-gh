import { IQuestion } from '@interfaces/IQuestion'
import { Document, Model, model, Schema } from 'mongoose'
export interface QuestionModel extends IQuestion, Document {}
const QuestionSchema = new Schema(
  {
    form: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      require: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    question: {
      type: String,
      required: true,
    },

    input: String,
    valueKey: String,
    option: String,
  },

  {
    timestamps: true,
  }
)

export const Question: Model<QuestionModel> = model<QuestionModel>('Question', QuestionSchema)
