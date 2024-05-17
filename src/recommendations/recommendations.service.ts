import { HttpException, Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { Recommendation } from './schema/recommendations.schema';
import { Professional } from 'src/professionals/schema/professional.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Recommendation.name)
    private recommendationModel: Model<Recommendation>,
    @InjectModel(Professional.name)
    private professionalModel: Model<Professional>,
  ) {}

  async create(_createRecommendationDto: CreateRecommendationDto) {
    const createdRecommend = await new this.recommendationModel(
      _createRecommendationDto,
    );

    if (_createRecommendationDto.like) {
      const professional = await this.professionalModel.findById(
        _createRecommendationDto.professionalId,
      );

      if (!professional) throw new HttpException('PROFESSIONAL_NOT_FOUND', 404);

      await this.professionalModel.findByIdAndUpdate(
        _createRecommendationDto.professionalId,
        {
          likes: professional.likes + 1,
        },
      );
    }

    return createdRecommend.save();
  }

  async update(id: string, updateRecommendationDto: UpdateRecommendationDto) {
    return this.recommendationModel.findByIdAndUpdate(
      id,
      updateRecommendationDto,
      {
        new: true,
      },
    );
  }

  async findAll() {
    const recommends = await this.recommendationModel.find().exec();

    return recommends;
  }

  findOne(id: string) {
    return this.recommendationModel.findById(id).exec();
  }

  async findAllByProfessional(professionalId: string) {
    const recommends = await this.recommendationModel
      .find({ professionalId, active: true })
      .exec();

    return recommends;
  }

  remove(id: string) {
    return this.recommendationModel.findByIdAndDelete(id);
  }
}
