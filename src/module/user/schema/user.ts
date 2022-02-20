import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IUser } from '../interface/user'

@Schema()
export class User implements IUser {
  @Prop({ type: String, required: false })
  name: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
