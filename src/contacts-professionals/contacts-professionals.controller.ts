import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsProfessionalsService } from './contacts-professionals.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactProfessionalDto } from './dto/create-contact-professional.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuardGuard } from 'src/auth/roles-guard.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('contacts-professionals')
@Controller('contacts-professionals')
export class ContactsProfessionalsController {
  constructor(private readonly contactsService: ContactsProfessionalsService) {}

  @Post()
  create(@Body() CreateContactDto: CreateContactProfessionalDto) {
    return this.contactsService.create(CreateContactDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }
}
