import { Test, TestingModule } from '@nestjs/testing';
import { ToDoAppService } from './to-do-app.service';

describe('ToDoAppService', () => {
  let service: ToDoAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoAppService],
    }).compile();

    service = module.get<ToDoAppService>(ToDoAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
