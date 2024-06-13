import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtHandle } from './utils/jwt-handle';
import { User, UserSchema } from '../users/schema/user.schema';
import { GoogleStrategy } from './strategy/google.strategy';
import {
  Professional,
  ProfessionalSchema,
} from 'src/professionals/schema/professional.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Professional.name,
        schema: ProfessionalSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtHandle, GoogleStrategy],
  exports: [JwtHandle],
})
export class AuthModule {}
