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
      ask: { type: String, require: true },
      input: [
        {
          type: { type: String, require: true },
          value: { type: String },
        },
      ],
    },
    subQuestion: {
      ask: { type: String },
      valueKey: { type: String },
      input: [
        {
          type: { type: String },
          value: { type: String },
        },
      ],
    },
  },

  {
    timestamps: true,
  }
)

export const Question: Model<QuestionModel> = model<QuestionModel>('Question', QuestionSchema)
