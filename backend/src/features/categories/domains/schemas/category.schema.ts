import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Category;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  icon: string;

  @Prop({ required: true, type: String })
  color: string;

  @Prop({ required: true, type: Boolean, default: false })
  isDefault: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
