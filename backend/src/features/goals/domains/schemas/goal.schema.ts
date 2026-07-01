import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema({ timestamps: true })
export class Goal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Goal;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  targetAmount: number;

  @Prop({ required: false, type: Number, default: 0 })
  savedAmount: number;

  @Prop({ required: false, type: Date })
  deadline: Date;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String, default: 'in_progress' })
  status: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
