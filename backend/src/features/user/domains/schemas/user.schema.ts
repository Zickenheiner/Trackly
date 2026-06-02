import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: User;

  @Prop({ required: false, type: String })
  title: string;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: false, type: Number })
  age: number;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: String, default: 'EUR' })
  currency: string;

  @Prop({ required: false, type: String, default: null })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
