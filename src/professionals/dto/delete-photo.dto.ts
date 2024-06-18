import { IsString } from 'class-validator';

export class deletePhotoDto {
  @IsString()
  userId: string;

  @IsString()
  imageUrl: string;
}
