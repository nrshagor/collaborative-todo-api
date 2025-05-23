import { Injectable } from '@nestjs/common';
import { CreateAppMemberDto } from './dto/create-app-member.dto';
import { UpdateAppMemberDto } from './dto/update-app-member.dto';

@Injectable()
export class AppMemberService {
  create(createAppMemberDto: CreateAppMemberDto) {
    return 'This action adds a new appMember';
  }

  findAll() {
    return `This action returns all appMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appMember`;
  }

  update(id: number, updateAppMemberDto: UpdateAppMemberDto) {
    return `This action updates a #${id} appMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} appMember`;
  }
}
