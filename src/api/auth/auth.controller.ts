import { Controller, Request, Post, UseGuards, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailService } from '../../email/email.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('authentication')
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
    const token = await this.authService.generatePasswordResetToken(requestResetPasswordDto);
    const resetLink = `http://localhost:3000/api/auth/reset-password?token=${token}`;
    await this.emailService.sendMail(
      requestResetPasswordDto.email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetLink}`,
      `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    );
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(@Query('token') token: string, @Body() resetPassword: ResetPasswordDto) {
    await this.authService.resetPassword(token, resetPassword);
    return { message: 'Password has been reset' };
  }
}
