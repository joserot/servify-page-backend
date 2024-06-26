import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { User, UserDocument } from '../users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  Professional,
  ProfessionalDocument,
} from 'src/professionals/schema/professional.schema';
import { RegisterAuthProfessionalDto } from './dto/register-auth-professional.dto';
import { ChangePasswordAuthDto } from './dto/change-password-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Professional.name)
    private readonly professionalModel: Model<ProfessionalDocument>,
  ) {}

  public async googleLogin(req) {
    if (!req.user) {
      return 'Usuario no valido';
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
        name: newUser.name,
        lastName: newUser.lastName,
        roles: newUser.roles,
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
        name: userExist.name,
        lastName: userExist.lastName,
        roles: userExist.roles,
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
    const { password, email } = await userLoginBody;

    const userExist = await this.userModel.findOne({
      email,
    });

    if (!userExist)
      throw new HttpException(
        'El email o la contraseña es incorrecto',
        HttpStatus.NOT_FOUND,
      );

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException(
        'El email o la contraseña es incorrecto',
        HttpStatus.CONFLICT,
      );

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
      name: userFlat.name,
      lastName: userFlat.lastName,
      roles: userFlat.roles,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userFlat,
    };

    return data;
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, email, name, lastName } = userBody;

    const existingUser = await this.userModel.find({ email });

    if (existingUser && existingUser.length) {
      throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);
    }

    const userParse = {
      name,
      email,
      lastName,
      password: await generateHash(password),
    };

    const newUser = await this.userModel.create(userParse);

    return this.login(userBody);
  }

  public async changePassword(
    userId: string,
    changePasswordBody: ChangePasswordAuthDto,
  ) {
    const { currentPassword, newPassword } = changePasswordBody;

    const userExist = await this.userModel.findOne({ _id: userId });

    if (!userExist) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    if (currentPassword === newPassword) {
      throw new HttpException(
        'La contraseña actual es igual a la nueva',
        HttpStatus.CONFLICT,
      );
    }
    const isCheck = await compareHash(currentPassword, userExist.password);

    if (!isCheck) {
      throw new HttpException(
        'La contraseña es incorrecta',
        HttpStatus.CONFLICT,
      );
    } else {
      userExist.password = await generateHash(newPassword);

      await userExist.save();

      return userExist;
    }
  }

  public async registerProfessional(userBody: RegisterAuthProfessionalDto) {
    const {
      password,
      email,
      name,
      lastName,
      profession,
      location,
      locationService,
      phone,
      price,
    } = userBody;

    const existingUser = await this.userModel.find({ email });

    if (existingUser && existingUser.length) {
      throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);
    }

    const userParse = {
      name,
      email,
      lastName,
      password: await generateHash(password),
      roles: ['user', 'professional'],
    };

    const newUser = await this.userModel.create(userParse);
    const userId = await newUser._id;

    await this.professionalModel.create({
      userId,
      profession,
      location,
      locationService,
      phone,
      price: Number(price),
      active: false,
    });

    return this.login(userBody);
  }

  public async me(token: string) {
    const decoded = await this.jwtService.decode(token);

    return decoded;
  }
}
