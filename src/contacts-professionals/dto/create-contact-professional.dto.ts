import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactProfessionalDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  service: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  location: string;
}
