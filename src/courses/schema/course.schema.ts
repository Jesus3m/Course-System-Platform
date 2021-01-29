import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Course {
  @Prop({ unique: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  teacher: string;
  @Prop()
  price: number;
  @Prop()
  duration: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
