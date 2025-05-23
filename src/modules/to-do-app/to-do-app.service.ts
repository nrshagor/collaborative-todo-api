import { Injectable } from '@nestjs/common';
import { CreateToDoAppDto } from './dto/create-to-do-app.dto';
import { UpdateToDoAppDto } from './dto/update-to-do-app.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoApp } from './entities/to-do-app.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ToDoAppService {
  constructor(
    @InjectRepository(ToDoApp)
    private readonly appRepo: Repository<ToDoApp>
  ) {}
  async create(createToDoAppDto: CreateToDoAppDto, owner: User) {
    const newApp = this.appRepo.create({
      ...createToDoAppDto,
      owner,
    });
    return await this.appRepo.save(newApp);
  }

  findAll() {
    return `This action returns all toDoApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDoApp`;
  }

  update(id: number, updateToDoAppDto: UpdateToDoAppDto) {
    return `This action updates a #${id} toDoApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDoApp`;
  }
}
