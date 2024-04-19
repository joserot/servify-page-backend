import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import {
  Recommendation,
  RecommendationSchema,
} from './schema/recommendations.schema';
import {
  Professional,
  ProfessionalSchema,
} from 'src/professionals/schema/professional.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recommendation.name,
        schema: RecommendationSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Professional.name,
        schema: ProfessionalSchema,
      },
    ]),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
