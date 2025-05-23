import { Test, TestingModule } from '@nestjs/testing';
import { ToDoAppController } from './to-do-app.controller';
import { ToDoAppService } from './to-do-app.service';

describe('ToDoAppController', () => {
  let controller: ToDoAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoAppController],
      providers: [ToDoAppService],
    }).compile();

    controller = module.get<ToDoAppController>(ToDoAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
