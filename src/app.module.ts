import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/servify'),
    TasksModule,
    AuthModule,
    UsersModule,
    ProfessionalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
