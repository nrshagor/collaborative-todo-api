import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ToDoApp } from '../to-do-app/entities/to-do-app.entity';
import { AppMember, AppMemberRole } from '../app-member/entities/app-member.entity';
import { User } from '../users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    @InjectRepository(ToDoApp) private readonly appRepo: Repository<ToDoApp>,
    @InjectRepository(AppMember) private readonly appMemberRepo: Repository<AppMember>
  ) {}

  async create(createDto: CreateTaskDto, user) {
    const app = await this.appRepo.findOne({
      where: { id: createDto.appId },
    });

    if (!app) throw new NotFoundException('App not found');

    const membership = await this.appMemberRepo.findOne({
      where: {
        todoApp: { id: createDto.appId },
        user: { id: user.userId },
      },
    });
    console.log({ membership });
    const allowedRoles = [AppMemberRole.OWNER, AppMemberRole.ADMIN, AppMemberRole.EDITOR];

    if (!membership || !allowedRoles.includes(membership.role)) {
      throw new ForbiddenException('You are not allowed to create a task');
    }

    const newTask = this.taskRepo.create({
      ...createDto,
      todoApp: app,
      created_by: user.userId,
    });

    return await this.taskRepo.save(newTask);
  }

  async findAll(appId: string, user: User) {
    const membership = await this.appMemberRepo.findOne({
      where: {
        todoApp: { id: appId },
        user: { id: user.id },
      },
    });

    const allowedRoles = [
      AppMemberRole.OWNER,
      AppMemberRole.ADMIN,
      AppMemberRole.EDITOR,
      AppMemberRole.VIEWER,
    ];

    if (!membership || !allowedRoles.includes(membership.role)) {
      throw new ForbiddenException('You are not allowed to view tasks');
    }

    return this.taskRepo.find({
      where: { todoApp: { id: appId } },
      relations: ['created_by'],
    });
  }
  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['todoApp'],
    });

    if (!task) throw new NotFoundException('Task not found');

    const membership = await this.appMemberRepo.findOne({
      where: {
        todoApp: { id: task.todoApp.id },
        user: { id: user.id },
      },
    });

    const allowedRoles = [AppMemberRole.OWNER, AppMemberRole.ADMIN, AppMemberRole.EDITOR];

    if (!membership || !allowedRoles.includes(membership.role)) {
      throw new ForbiddenException('You are not allowed to update tasks');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepo.save(task);
  }

  async remove(id: string, user: User) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['todoApp'],
    });

    if (!task) throw new NotFoundException('Task not found');

    const membership = await this.appMemberRepo.findOne({
      where: {
        todoApp: { id: task.todoApp.id },
        user: { id: user.id },
      },
    });

    const allowedRoles = [AppMemberRole.OWNER, AppMemberRole.ADMIN];

    if (!membership || !allowedRoles.includes(membership.role)) {
      throw new ForbiddenException('You are not allowed to delete tasks');
    }

    return this.taskRepo.remove(task);
  }
}
