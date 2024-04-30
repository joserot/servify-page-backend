import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { RolesGuardGuard } from 'src/auth/roles-guard.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('professionals')
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  findByFilters(
    @Query('location') location: string,
    @Query('profession') profession: string,
    @Query('locationService') locationService: string,
    @Query('orderBy') orderBy: 'likes' | 'price',
  ) {
    return this.professionalsService.findByFilters(
      location,
      profession,
      locationService,
      orderBy,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Get('all')
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createProfessionalDto: CreateProfessionalDto,
    @UploadedFile() file,
  ) {
    return this.professionalsService.create(createProfessionalDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Patch(':id')
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
    @UploadedFile() file,
  ) {
    return this.professionalsService.update(id, updateProfessionalDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(id);
  }
}
