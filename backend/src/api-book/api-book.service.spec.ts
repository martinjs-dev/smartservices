import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookService } from './api-book.service';

describe('ApiBookService', () => {
  let service: ApiBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiBookService],
    }).compile();

    service = module.get<ApiBookService>(ApiBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
