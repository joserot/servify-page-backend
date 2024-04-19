import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalsService {
  create(_createProfessionalDto: CreateProfessionalDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return 'This action returns all users';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
