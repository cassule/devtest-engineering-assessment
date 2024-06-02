import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private invalidatedTokens: string[] = [];

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async generatePasswordResetToken(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async resetPassword(token: string, resetPassword: ResetPasswordDto) {
    try {
      const { newPassword } = resetPassword;

      if (this.invalidatedTokens.includes(token)) {
        throw new Error('Token has already been used');
      }

      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secretKey' });
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new Error('User not found');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updatePassword(user.id, hashedPassword);

      this.invalidatedTokens.push(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
