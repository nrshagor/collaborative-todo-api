import { Test, TestingModule } from '@nestjs/testing';
import { AppMemberController } from './app-member.controller';
import { AppMemberService } from './app-member.service';

describe('AppMemberController', () => {
  let controller: AppMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppMemberController],
      providers: [AppMemberService],
    }).compile();

    controller = module.get<AppMemberController>(AppMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
