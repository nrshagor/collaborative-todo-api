import { Injectable } from '@nestjs/common';
import { CreateToDoAppDto } from './dto/create-to-do-app.dto';
import { UpdateToDoAppDto } from './dto/update-to-do-app.dto';

@Injectable()
export class ToDoAppService {
  create(createToDoAppDto: CreateToDoAppDto) {
    return 'This action adds a new toDoApp';
  }

  findAll() {
    return `This action returns all toDoApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDoApp`;
  }

  update(id: number, updateToDoAppDto: UpdateToDoAppDto) {
    return `This action updates a #${id} toDoApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDoApp`;
  }
}
