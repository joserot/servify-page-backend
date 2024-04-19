import { MaxLength, MinLength, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
