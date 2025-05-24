import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(registerDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersRepository.create({ ...registerDto, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async findByEmailOrPhone(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ email: identifier }, { phone: identifier }],
    });
  }

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'email', 'name'], // or any minimal fields needed
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
