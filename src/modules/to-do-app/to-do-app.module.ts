import { Module } from '@nestjs/common';
import { ToDoAppService } from './to-do-app.service';
import { ToDoAppController } from './to-do-app.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoApp } from './entities/to-do-app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoApp])],
  controllers: [ToDoAppController],
  providers: [ToDoAppService],
})
export class ToDoAppModule {}
