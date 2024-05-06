import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dto/create-contact.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuardGuard } from 'src/auth/roles-guard.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() CreateContactDto: CreateContactDto) {
    return this.contactsService.create(CreateContactDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }
}
