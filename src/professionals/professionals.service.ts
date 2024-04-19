import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Professional } from './schema/professional.schema';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<Professional>,
  ) {}

  async create(_createProfessionalDto: CreateProfessionalDto) {
    const createdProfessional = new this.professionalModel(
      _createProfessionalDto,
    );
    return createdProfessional.save();
  }

  async findAll() {
    return this.professionalModel.find().exec();
  }

  findOne(id: string) {
    return this.professionalModel.findById(id).exec();
  }

  update(id: string, _updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalModel.findByIdAndUpdate(
      id,
      _updateProfessionalDto,
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.professionalModel.findByIdAndDelete(id);
  }
}
