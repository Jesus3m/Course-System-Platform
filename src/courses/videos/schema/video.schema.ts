import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Video {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  url: string;
  @Prop()
  course: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
