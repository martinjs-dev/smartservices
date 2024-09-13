import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookController } from './api-book.controller';

describe('ApiBookController', () => {
  let controller: ApiBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiBookController],
    }).compile();

    controller = module.get<ApiBookController>(ApiBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
