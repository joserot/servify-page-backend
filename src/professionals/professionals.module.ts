import { Module } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from './schema/professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Professional.name,
        schema: ProfessionalSchema,
      },
    ]),
  ],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
