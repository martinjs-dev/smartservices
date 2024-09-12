import { Controller, Get } from '@nestjs/common';
import { ApiNewsService } from './api-news.service';

@Controller('api-news')
export class ApiNewsController {
  constructor(private readonly apiNewsService: ApiNewsService) {}

  @Get()
  async getAllNews() {
    return await this.apiNewsService.getNews();
  }
}
http://localhost:3000/api-news