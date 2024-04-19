import {
  IsEmail,
  MaxLength,
  MinLength,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateProfessionalDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @MinLength(3)
  @MaxLength(20)
  profession: string;

  @MinLength(3)
  @MaxLength(20)
  location: string;

  @MinLength(3)
  @MaxLength(20)
  locationService: string;

  @MinLength(6)
  @MaxLength(20)
  phone: string;

  @MinLength(20)
  @MaxLength(500)
  description: string;

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
}
