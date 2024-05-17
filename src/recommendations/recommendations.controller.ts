import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuardGuard } from 'src/auth/roles-guard.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  create(@Body() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationsService.create(createRecommendationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationsService.findOne(id);
  }

  @Get('/professional/:professionalId')
  findAll(@Param('professionalId') professionalId: string) {
    return this.recommendationsService.findAllByProfessional(professionalId);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
  ) {
    return this.recommendationsService.update(id, updateRecommendationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Get()
  findAllAdmin() {
    return this.recommendationsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuardGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationsService.remove(id);
  }
}
