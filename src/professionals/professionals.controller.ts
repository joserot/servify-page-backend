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
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { RolesGuardGuard } from 'src/auth/roles-guard.guard';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'jobsImages', maxCount: 20 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,

    @UploadedFiles()
    files: {
      avatar?;
      jobsImages?;
    },
  ) {
    const { avatar, jobsImages } = files;

    return this.professionalsService.update(
      id,
      updateProfessionalDto,
      avatar,
      jobsImages,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(id);
  }
}
