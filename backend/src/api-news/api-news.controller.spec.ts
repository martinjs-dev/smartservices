import { Test, TestingModule } from '@nestjs/testing';
import { ApiNewsController } from './api-news.controller';

describe('ApiNewsController', () => {
  let controller: ApiNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiNewsController],
    }).compile();

    controller = module.get<ApiNewsController>(ApiNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
