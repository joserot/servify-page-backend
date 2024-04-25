import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

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

  @Get(':professionalId')
  findAll(@Param('professionalId') professionalId: string) {
    if (!professionalId) return this.recommendationsService.findAll();

    return this.recommendationsService.findAllByProfessional(professionalId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationsService.remove(id);
  }
}
