import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ContactsDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;
}
export const ContactsSchema = SchemaFactory.createForClass(Contact);
