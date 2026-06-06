import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Transaction;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: false, type: String })
  label: string;

  @Prop({ required: false, type: String })
  note: string;

  @Prop({ required: true, type: Date })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
