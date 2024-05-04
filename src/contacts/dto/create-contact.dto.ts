import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;
}
