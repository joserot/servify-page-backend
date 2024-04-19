import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type RecommendationDocument = Recommendation & Document;

@Schema({ timestamps: true })
export class Recommendation {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  like: boolean;

  @Prop({ required: true })
  professionalId: string;

  @Prop()
  name: string;

  @Prop()
  text: string;
}
export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
