import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactProfessionalDto } from './dto/create-contact-professional.dto';
import { ContactProfessional } from './schema/contacts-professionals.schema';

@Injectable()
export class ContactsProfessionalsService {
  constructor(
    @InjectModel(ContactProfessional.name)
    private contactProfessional: Model<ContactProfessional>,
  ) {}

  async create(_createContactDto: CreateContactProfessionalDto) {
    const createdContact = await new this.contactProfessional(
      _createContactDto,
    );

    return createdContact.save();
  }

  async findAll() {
    const contacts = await this.contactProfessional.find().exec();

    return contacts;
  }
}
