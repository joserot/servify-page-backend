import { MaxLength, MinLength, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3, {
    message: 'El nombre debe tener 3 caracteres como mínimo',
  })
  @MaxLength(30, {
    message: 'El nombre debe tener 30 caracteres como máximo',
  })
  name?: string;

  @IsOptional()
  @MinLength(3, {
    message: 'El apellido debe tener 3 caracteres como mínimo',
  })
  @MaxLength(30, {
    message: 'El apellido debe tener 30 caracteres como máximo',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
