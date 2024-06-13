import { IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterAuthDto } from './register-auth.dto';

export class RegisterAuthProfessionalDto extends RegisterAuthDto {
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

  @IsString()
  price: string;
}
