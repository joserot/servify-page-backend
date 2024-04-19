import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateRecommendationDto {
  @IsBoolean()
  @IsNotEmpty()
  like: boolean;

  @IsString()
  @IsNotEmpty()
  professionalId: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  text: string;
}
