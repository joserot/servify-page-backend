import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Professional } from './schema/professional.schema';

import uploadImage from 'src/functions/upload-image';

import uploadMultipleImages from 'src/functions/upload-multiple-images';

interface FiltersObject {
  active?: boolean;
  location?: string;
  profession?: string;
  locationService?: string;
}

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<Professional>,
  ) {}

  async findByFilters(
    location: string,
    profession: string,
    locationService: string,
    orderBy: 'likes' | 'price',
  ) {
    const filters: FiltersObject = {
      active: true,
    };

    if (location) {
      filters.location = location;
    }

    if (profession) {
      filters.profession = profession;
    }

    if (locationService) {
      filters.locationService = locationService;
    }

    const order: any =
      orderBy === 'price'
        ? orderBy
        : orderBy === 'likes'
        ? [[orderBy, -1]]
        : '';

    return this.professionalModel.find(filters).sort(order).exec();
  }

  async create(_createProfessionalDto: CreateProfessionalDto, file: any) {
    if (!file) {
      const createdProfessional = new this.professionalModel({
        ..._createProfessionalDto,
        price: Number(_createProfessionalDto.price),
      });
      return createdProfessional.save();
    }

    const imageUrl = await uploadImage(file);

    const createdProfessional = new this.professionalModel({
      ..._createProfessionalDto,
      avatar: imageUrl,
      price: Number(_createProfessionalDto.price),
    });

    return createdProfessional.save();
  }

  async findAll() {
    return this.professionalModel.find().exec();
  }

  findOne(id: string) {
    return this.professionalModel.findById(id).exec();
  }

  async update(
    id: string,
    _updateProfessionalDto: UpdateProfessionalDto,
    avatar: any,
    jobsImages: any[],
  ) {
    const price = _updateProfessionalDto.price
      ? Number(_updateProfessionalDto.price)
      : 0;

    if (!avatar && !jobsImages) {
      return this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          price,
          active: _updateProfessionalDto.active === '1' ? true : false,
        },
        {
          new: true,
        },
      );
    } else if (avatar && !jobsImages) {
      const imageUrl = await uploadImage(avatar);

      return this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          avatar: imageUrl,
          price,
          active: _updateProfessionalDto.active === '1' ? true : false,
        },
        {
          new: true,
        },
      );
    } else if (!avatar && jobsImages) {
      const imagesUrl = await uploadMultipleImages(jobsImages);

      return this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          jobsImages: imagesUrl,
          price,
          active: _updateProfessionalDto.active === '1' ? true : false,
        },
        {
          new: true,
        },
      );
    } else {
      const imageUrl = await uploadImage(avatar);
      const imagesUrl = await uploadMultipleImages(jobsImages);

      return this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          jobsImages: imagesUrl,
          avatar: imageUrl,
          price,
          active: _updateProfessionalDto.active === '1' ? true : false,
        },
        {
          new: true,
        },
      );
    }
  }

  remove(id: string) {
    return this.professionalModel.findByIdAndDelete(id);
  }
}
