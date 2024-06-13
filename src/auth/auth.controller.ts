import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  HttpStatus,
  Req,
  Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GoogleOauthGuard } from './google-oauth.guard';
import { FRONTEND_URL } from 'src/constants/constants';
import { RegisterAuthProfessionalDto } from './dto/register-auth-professional.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody);
  }

  @Post('register')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    return this.authService.register(registerBody);
  }

  @Post('/register/professional')
  handleRegisterProfessional(
    @Body() registerBody: RegisterAuthProfessionalDto,
  ) {
    return this.authService.registerProfessional(registerBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect('https://localhost:3000/api/login', 302)
  async googleAuthRedirect(@Req() req) {
    const response: any = await this.authService.googleLogin(req);
    const token = await response.token;

    if (!token) return response;

    return { url: `${FRONTEND_URL}/api/login?token=${token}` };
  }
}
