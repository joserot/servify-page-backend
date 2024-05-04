import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './schema/contacts.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<Contact>,
  ) {}

  async create(_createContactDto: CreateContactDto) {
    const createdContact = await new this.contactModel(_createContactDto);

    return createdContact.save();
  }

  async findAll() {
    const contacts = await this.contactModel.find().exec();

    return contacts;
  }
}
