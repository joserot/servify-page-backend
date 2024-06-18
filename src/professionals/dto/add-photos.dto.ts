import { IsString } from 'class-validator';

export class AddPhotosDto {
  @IsString()
  userId: string;
}
