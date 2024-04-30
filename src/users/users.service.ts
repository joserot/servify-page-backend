import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import uploadImage from 'src/functions/upload-image';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async update(id: string, _updateUserDto: UpdateUserDto, file: any) {
    if (!file) {
      return this.userModel.findByIdAndUpdate(id, _updateUserDto, {
        new: true,
      });
    }

    const imageUrl = await uploadImage(file);

    return this.userModel.findByIdAndUpdate(
      id,
      { ..._updateUserDto, avatar: imageUrl },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
