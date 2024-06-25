import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { UpdateMyProfileProfessionalDto } from './dto/update-my-profile-professional.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Professional } from './schema/professional.schema';
import { User } from 'src/users/schema/user.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { generateHash } from 'src/auth/utils/handleBcrypt';

import resizeAvatar from 'src/functions/resize-avatar';
import resizeJobImage from 'src/functions/resize-job-image';
import deleteImage from 'src/functions/delete-image';

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
    @InjectModel(User.name)
    private userModel: Model<User>,
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

    return this.professionalModel
      .find(filters)
      .sort(order)
      .populate('userId')
      .exec();
  }

  async findByUserId(userId: string) {
    return this.professionalModel
      .findOne({ userId: userId })
      .populate('userId')
      .exec();
  }

  async addPhotos(
    professionalId: string,
    userId: string,
    jobsImages: string[],
  ) {
    const professional = await this.professionalModel.findById(professionalId);
    const professionalUserId = await professional.userId.toString();

    if (professionalUserId !== userId) {
      throw new HttpException(
        'No se encontro el profesional',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!jobsImages || jobsImages.length === 0) {
      throw new HttpException(
        'No se han subido imágenes',
        HttpStatus.BAD_REQUEST,
      );
    }

    const numberOfImages = jobsImages.length + professional.jobsImages.length;

    if (numberOfImages > 10) {
      throw new HttpException(
        'Se han subido más de 10 imágenes',
        HttpStatus.BAD_REQUEST,
      );
    }

    const jobImagesResized = await Promise.all(
      jobsImages.map(async (jobImage) => {
        const image = await resizeJobImage(jobImage);
        return image;
      }),
    );

    const imagesUrl = await uploadMultipleImages(jobImagesResized);

    const imagesArray = await imagesUrl.concat(professional.jobsImages);

    return this.professionalModel.findByIdAndUpdate(
      professionalId,
      {
        jobsImages: imagesArray,
        active: false,
      },
      {
        new: true,
      },
    );
  }

  async deletePhotoDto(
    professionalId: string,
    userId: string,
    imageUrl: string,
  ) {
    const professional = await this.professionalModel.findById(professionalId);
    const professionalUserId = await professional.userId.toString();

    if (professionalUserId !== userId) {
      throw new HttpException(
        'No se encontro el profesional',
        HttpStatus.NOT_FOUND,
      );
    }

    const image = await deleteImage(imageUrl);

    if (!image) {
      throw new HttpException('No se encontro la imagen', HttpStatus.NOT_FOUND);
    }

    const currentJobsImages = professional.jobsImages;
    const filteredJobsImages = currentJobsImages.filter(
      (jobImage) => jobImage !== imageUrl,
    );

    return this.professionalModel.findByIdAndUpdate(
      professionalId,
      {
        jobsImages: filteredJobsImages,
      },
      {
        new: true,
      },
    );
  }

  async create(_createProfessionalDto: CreateProfessionalDto, file: any) {
    const {
      name,
      lastName,
      email,
      profession,
      location,
      locationService,
      phone,
      price,
      description,
      verifications,
      startDay,
      endDay,
      startTime,
      endTime,
    } = _createProfessionalDto;

    const existingUser = await this.userModel.find({ email });

    if (existingUser && existingUser.length) {
      throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);
    }

    const password = 'bwWMnzAw82bAKOi';

    if (!file) {
      const userParse = {
        name,
        email,
        lastName,
        password: await generateHash(password),
        roles: ['user', 'professional'],
      };

      const newUser = await this.userModel.create(userParse);
      const userId = await newUser._id;

      const createdProfessional = await this.professionalModel.create({
        userId,
        profession,
        location,
        locationService,
        phone,
        price: Number(price),
        active: false,
        description,
        verifications,
        startDay,
        endDay,
        startTime,
        endTime,
      });

      return createdProfessional.save();
    }

    const imageUrl = await uploadImage(file);

    const userParse = {
      name,
      email,
      lastName,
      password: await generateHash(password),
      roles: ['user', 'professional'],
      avatar: imageUrl,
    };

    const newUser = await this.userModel.create(userParse);
    const userId = await newUser._id;

    const createdProfessional = await this.professionalModel.create({
      userId,
      profession,
      location,
      locationService,
      phone,
      price: Number(price),
      active: false,
      description,
      verifications,
      startDay,
      endDay,
      startTime,
      endTime,
    });

    return createdProfessional.save();
  }

  async findAll() {
    return this.professionalModel.find().populate('userId').exec();
  }

  findOne(id: string) {
    return this.professionalModel.findById(id).populate('userId').exec();
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

      const professional = await this.professionalModel.findByIdAndUpdate(
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

      await this.userModel.findByIdAndUpdate(professional.userId, {
        avatar: imageUrl,
      });

      return professional;
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

      const professional = await this.professionalModel.findByIdAndUpdate(
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

      await this.userModel.findByIdAndUpdate(professional.userId, {
        avatar: imageUrl,
      });

      return professional;
    }
  }

  async updateProfile(
    id: string,
    _updateProfessionalDto: UpdateMyProfileProfessionalDto,
    avatar: any,
    userId: string,
  ) {
    const professional = await this.professionalModel.findById(id);
    const professionalUserId = await professional.userId.toString();

    if (professionalUserId !== userId) {
      throw new HttpException(
        'No se encontro el profesional',
        HttpStatus.NOT_FOUND,
      );
    }

    const price = _updateProfessionalDto.price
      ? Number(_updateProfessionalDto.price)
      : 0;

    if (!avatar) {
      return this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          price,
          active: false,
        },
        {
          new: true,
        },
      );
    } else {
      const image = await resizeAvatar(avatar);

      const imageUrl = await uploadImage(image);

      const professional = await this.professionalModel.findByIdAndUpdate(
        id,
        {
          ..._updateProfessionalDto,
          price,
          active: false,
        },
        {
          new: true,
        },
      );

      await this.userModel.findByIdAndUpdate(professional.userId, {
        avatar: imageUrl,
      });

      return professional;
    }
  }

  remove(id: string) {
    return this.professionalModel.findByIdAndDelete(id);
  }
}
