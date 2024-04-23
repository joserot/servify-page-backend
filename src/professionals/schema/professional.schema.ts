import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ProfessionalDocument = Professional & Document;

@Schema({ timestamps: true })
export class Professional {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  locationService: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop()
  verifications: string[];

  @Prop()
  price: number;

  @Prop()
  jobsImages: string[];

  @Prop()
  avatar: string;

  @Prop({ default: 0 })
  likes: number;
}
export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
