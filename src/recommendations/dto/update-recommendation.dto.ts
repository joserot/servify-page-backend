import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateRecommendationDto {
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
