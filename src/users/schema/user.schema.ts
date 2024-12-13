import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    unique: true,
    default: uuidv4,
  })
  id: string;

  @Prop({
    unique: [true, 'El email ya existe'],
    default: uuidv4,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: ['user'],
  })
  roles: string[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  avatar: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
