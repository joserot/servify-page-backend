import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ContactsProfessionalDocument = ContactProfessional & Document;

@Schema({ timestamps: true })
export class ContactProfessional {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  location: string;
}
export const ContactsProfessionalSchema =
  SchemaFactory.createForClass(ContactProfessional);
