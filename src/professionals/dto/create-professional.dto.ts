import {
  IsEmail,
  MaxLength,
  MinLength,
  IsArray,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateProfessionalDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(30)
  name: string;

  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @MinLength(3)
  @MaxLength(50)
  profession: string;

  @MinLength(3)
  @MaxLength(50)
  location: string;

  @MinLength(3)
  @MaxLength(50)
  locationService: string;

  @MinLength(6)
  @MaxLength(20)
  phone: string;

  @MinLength(20)
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsArray()
  verifications?: string[];

  @IsOptional()
  @IsString()
  price?: string;

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
