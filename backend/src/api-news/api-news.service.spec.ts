import { Test, TestingModule } from '@nestjs/testing';
import { ApiNewsService } from './api-news.service';

describe('ApiNewsService', () => {
  let service: ApiNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiNewsService],
    }).compile();

    service = module.get<ApiNewsService>(ApiNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
