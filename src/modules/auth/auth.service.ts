import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterUserDto) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const newUser = await this.usersServices.createUser(registerDto);

      return { newUser, message: 'User Successfully Register' };
    } catch (error) {
      if (/(email)[\s\S]+(already exists)/.test(error.detail)) {
        throw new BadRequestException('Account with this email already exists.');
      }
    }
  }

  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.usersServices.findByEmailOrPhone(identifier);

    if (!user) {
      throw new NotFoundException('User not found with this email or phone number');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' }); // Access token expires in 15 minutes
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token expires in 7 days

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
