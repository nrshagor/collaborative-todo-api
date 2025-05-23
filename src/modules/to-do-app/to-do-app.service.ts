import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(userId) {
    return this.appRepo
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.owner', 'owner')
      .where('owner.id = :userId', { userId: userId })
      .getMany();
  }

  async findOne(id: string) {
    const app = await this.appRepo.findOne({
      where: { id },
      relations: ['owner', 'members'],
    });
    if (!app) throw new NotFoundException('ToDo App not found');
    return app;
  }

  update(id: number, updateToDoAppDto: UpdateToDoAppDto) {
    return `This action updates a #${id} toDoApp`;
  }

  async remove(id: string, userId) {
    const app = await this.findOne(id);
    if (app.owner.id !== userId) throw new Error('Only owner can delete app');
    await this.appRepo.remove(app);
  }
}
