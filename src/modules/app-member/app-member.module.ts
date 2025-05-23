import { Module } from '@nestjs/common';
import { AppMemberService } from './app-member.service';
import { AppMemberController } from './app-member.controller';

@Module({
  controllers: [AppMemberController],
  providers: [AppMemberService],
})
export class AppMemberModule {}
