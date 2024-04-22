import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { User, UserDocument } from '../users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const userExist = await this.userModel.findOne({
      email: req.user.email,
    });

    if (!userExist) {
      const newUser = await this.userModel.create({
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        avatar: req.user.avatar,
      });

      const payload = {
        id: newUser._id,
      };

      const token = this.jwtService.sign(payload);

      const data = {
        token,
        user: newUser,
      };

      return data;
    } else {
      const payload = {
        id: userExist._id,
      };

      const token = this.jwtService.sign(payload);

      const data = {
        token,
        user: req.user,
      };

      return data;
    }
  }

  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({
      email: userLoginBody.email,
    });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userFlat,
    };

    return data;
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    const userParse = {
      ...user,
      password: await generateHash(password),
    };

    await this.userModel.create(userParse);

    return this.login(userBody);
  }

  public async me(token: string) {
    const decoded = await this.jwtService.decode(token);

    return decoded;
  }
}
