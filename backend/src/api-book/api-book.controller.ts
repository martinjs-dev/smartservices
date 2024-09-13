import { Controller, Get } from '@nestjs/common';
import { ApiBookService } from './api-book.service';

@Controller('api-book')
export class ApiBookController {
  constructor(private readonly apiBookService: ApiBookService) {}

  @Get()
  async getAllBooks() {
    return await this.apiBookService.getBook();
  }
}
