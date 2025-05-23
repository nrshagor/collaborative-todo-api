import { Module } from '@nestjs/common';
import { AppMemberService } from './app-member.service';
import { AppMemberController } from './app-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppMember } from './entities/app-member.entity';
import { ToDoApp } from '../to-do-app/entities/to-do-app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppMember, ToDoApp])],
  controllers: [AppMemberController],
  providers: [AppMemberService],
})
export class AppMemberModule {}
