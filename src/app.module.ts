import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsProfessionalsModule } from './contacts-professionals/contacts-professionals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    ProfessionalsModule,
    RecommendationsModule,
    ContactsModule,
    ContactsProfessionalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
