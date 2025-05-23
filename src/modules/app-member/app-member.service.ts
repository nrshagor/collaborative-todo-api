import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppMember, AppMemberRole } from './entities/app-member.entity';
import { CreateAppMemberDto } from './dto/create-app-member.dto';
import { ToDoApp } from '../to-do-app/entities/to-do-app.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AppMemberService {
  constructor(
    @InjectRepository(AppMember)
    private readonly appMemberRepo: Repository<AppMember>,
    @InjectRepository(ToDoApp)
    private readonly todoAppRepo: Repository<ToDoApp>
  ) {}

  async create(createDto: CreateAppMemberDto, currentUser: User) {
    const app = await this.todoAppRepo.findOne({
      where: { id: createDto.appId },
      relations: ['members'],
    });

    if (!app) throw new NotFoundException('App not found');

    const currentMember = await this.appMemberRepo.findOne({
      where: {
        todoApp: { id: createDto.appId },
        user: { id: currentUser.id },
      },
    });

    if (
      !currentMember ||
      (currentMember.role !== AppMemberRole.OWNER && currentMember.role !== AppMemberRole.ADMIN)
    ) {
      throw new ForbiddenException('You are not allowed to invite users');
    }

    const newMember = this.appMemberRepo.create({
      todoApp: { id: createDto.appId },
      user: { id: createDto.userId },
      role: createDto.role,
    });

    return this.appMemberRepo.save(newMember);
  }

  async findAllForApp(appId: string) {
    return this.appMemberRepo.find({
      where: { todoApp: { id: appId } },
      relations: ['user'],
    });
  }
}
