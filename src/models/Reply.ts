import { IReply } from '@interfaces/IReply'
import { Document, Model, model, Schema } from 'mongoose'
export interface ReplyModel extends IReply, Document {}
const ReplySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      require: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      require: true,
    },
    answer: String,
    other: String,
  },

  {
    timestamps: true,
  }
)

export const Reply: Model<ReplyModel> = model<ReplyModel>('Reply', ReplySchema)
