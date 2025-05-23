import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ToDoApp } from '../to-do-app/entities/to-do-app.entity';
import { AppMember } from '../app-member/entities/app-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, ToDoApp, AppMember])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
