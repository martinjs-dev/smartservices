import { Module } from '@nestjs/common';
import { ApiBookService } from './api-book.service';
import { ApiBookController } from './api-book.controller';

@Module({
  providers: [ApiBookService],
  controllers: [ApiBookController],
})
export class ApiBookModule {}
