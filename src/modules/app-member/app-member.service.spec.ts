import { Test, TestingModule } from '@nestjs/testing';
import { AppMemberService } from './app-member.service';

describe('AppMemberService', () => {
  let service: AppMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMemberService],
    }).compile();

    service = module.get<AppMemberService>(AppMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
