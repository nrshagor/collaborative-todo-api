import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppMemberService } from './app-member.service';
import { CreateAppMemberDto } from './dto/create-app-member.dto';
import { UpdateAppMemberDto } from './dto/update-app-member.dto';

@Controller('app-member')
export class AppMemberController {
  constructor(private readonly appMemberService: AppMemberService) {}

  @Post()
  create(@Body() createAppMemberDto: CreateAppMemberDto) {
    return this.appMemberService.create(createAppMemberDto);
  }

  @Get()
  findAll() {
    return this.appMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppMemberDto: UpdateAppMemberDto) {
    return this.appMemberService.update(+id, updateAppMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appMemberService.remove(+id);
  }
}
