/* eslint-disable no-unused-vars */
import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from '@interfaces/IUser'

export interface UserModel extends IUser, Document {
  fullName(): string
}

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return (this.firstName.trim() + ' ' + this.lastName.trim())
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
