import { IUser } from '@interfaces/IUser'
import * as bcrypt from 'bcryptjs'
import { Document, Model, model, Schema } from 'mongoose'

export interface UserModel extends IUser, Document {
  fullName(): string
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    theme: String,
    role: String,
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.methods.fullName = function (): string {
  return this.firstName.trim() + ' ' + this.lastName.trim()
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
