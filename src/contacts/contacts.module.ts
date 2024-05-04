import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsSchema, Contact } from './schema/contacts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactsSchema,
      },
    ]),
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
