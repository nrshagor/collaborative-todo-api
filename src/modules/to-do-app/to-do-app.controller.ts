import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ToDoAppService } from './to-do-app.service';
import { CreateToDoAppDto } from './dto/create-to-do-app.dto';
import { UpdateToDoAppDto } from './dto/update-to-do-app.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('to-do-app')
@UseGuards(JwtAuthGuard)
export class ToDoAppController {
  constructor(private readonly toDoAppService: ToDoAppService) {}

  @Post()
  create(@Body() createToDoAppDto: CreateToDoAppDto, @Req() req) {
    const userId = req.user.userId;
    return this.toDoAppService.create(createToDoAppDto, userId);
  }

  @Get()
  findAll() {
    return this.toDoAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoAppDto: UpdateToDoAppDto) {
    return this.toDoAppService.update(+id, updateToDoAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoAppService.remove(+id);
  }
}
