import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsProfessionalsService } from './contacts-professionals.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactProfessionalDto } from './dto/create-contact-professional.dto';

@ApiTags('contacts-professionals')
@Controller('contacts-professionals')
export class ContactsProfessionalsController {
  constructor(private readonly contactsService: ContactsProfessionalsService) {}

  @Post()
  create(@Body() CreateContactDto: CreateContactProfessionalDto) {
    return this.contactsService.create(CreateContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }
}
