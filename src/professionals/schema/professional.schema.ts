import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ProfessionalDocument = Professional & Document;
import { User } from 'src/users/schema/user.schema';
import { Types, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Professional {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  locationService: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop()
  description: string;

  @Prop()
  verifications: string[];

  @Prop()
  price: number;

  @Prop()
  jobsImages: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop()
  startDay: string;

  @Prop()
  endDay: string;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;
}
export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
