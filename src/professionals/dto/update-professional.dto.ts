import {
  IsEmail,
  MaxLength,
  MinLength,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
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
  @MaxLength(20)
  profession?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  location?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  locationService?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @MinLength(20)
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsArray()
  verifications?: string[];

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsArray()
  jobsImages?: string[];

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}