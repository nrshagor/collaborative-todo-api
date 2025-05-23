import { Module } from '@nestjs/common';
import { ToDoAppService } from './to-do-app.service';
import { ToDoAppController } from './to-do-app.controller';

@Module({
  controllers: [ToDoAppController],
  providers: [ToDoAppService],
})
export class ToDoAppModule {}
