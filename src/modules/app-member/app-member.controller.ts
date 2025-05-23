import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AppMemberService } from './app-member.service';
import { CreateAppMemberDto } from './dto/create-app-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('app-members')
@UseGuards(JwtAuthGuard)
export class AppMemberController {
  constructor(private readonly appMemberService: AppMemberService) {}

  @Post()
  async invite(@Body() dto: CreateAppMemberDto, @Req() req) {
    const user = req.user.userId;
    return this.appMemberService.create(dto, user);
  }

  @Get(':appId')
  async findAll(@Param('appId') appId: string) {
    return this.appMemberService.findAllForApp(appId);
  }
}
