import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Transaction;

  @Prop({ required: true, type: String, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  label: string;

  @Prop({ required: false, type: String, default: null })
  note: string | null;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
