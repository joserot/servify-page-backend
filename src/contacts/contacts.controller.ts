import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() CreateContactDto: CreateContactDto) {
    return this.contactsService.create(CreateContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }
}
