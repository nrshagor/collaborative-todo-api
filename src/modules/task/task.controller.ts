import { Controller, Post, Body, UseGuards, Req, Get, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust path to your guard
import { Request } from 'express';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createDto: CreateTaskDto, @Req() req) {
    const user = req.user as any;
    return this.taskService.create(createDto, user);
  }

  @Get()
  async findAll(@Query('appId') appId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.taskService.findAll(appId, user);
  }
}
