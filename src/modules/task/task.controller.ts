import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust path to your guard
import { Request } from 'express';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: Request) {
    const user = req.user as any;
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.taskService.remove(id, user);
  }
}
