import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AppMemberService } from './app-member.service';
import { CreateAppMemberDto } from './dto/create-app-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateAppMemberDto } from './dto/update-app-member.dto';

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
  @Patch(':id')
  async updateRole(@Param('id') id: string, @Body() dto: UpdateAppMemberDto, @Req() req) {
    const user = req.user.userId;
    return this.appMemberService.updateRole(id, dto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('appId') appId: string, @Req() req) {
    const user = req.user.userId;
    return this.appMemberService.remove(id, appId, user);
  }
}
