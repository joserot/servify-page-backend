import {
  IsEmail,
  MaxLength,
  MinLength,
  IsArray,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateProfessionalDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  profession?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  location?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  locationService?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @MinLength(20)
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsArray()
  verifications?: string[];

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  active?: string;

  @IsOptional()
  @IsString()
  startDay?: string;

  @IsOptional()
  @IsString()
  endDay?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}
