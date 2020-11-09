/* eslint-disable no-unused-vars */
import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from '@interfaces/IUser'
import * as bcrypt from 'bcryptjs'

export interface UserModel extends IUser, Document {
  fullName(): string
}

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String
}, {
  timestamps: true
})

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.methods.fullName = function (): string {
  return (this.firstName.trim() + ' ' + this.lastName.trim())
}



export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
