import { Module } from '@nestjs/common';
import { ContactsProfessionalsController } from './contacts-professionals.controller';
import { ContactsProfessionalsService } from './contacts-professionals.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContactsProfessionalSchema,
  ContactProfessional,
} from './schema/contacts-professionals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContactProfessional.name,
        schema: ContactsProfessionalSchema,
      },
    ]),
  ],
  controllers: [ContactsProfessionalsController],
  providers: [ContactsProfessionalsService],
})
export class ContactsProfessionalsModule {}
