import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/about.json')
  getAbout(): any {
    return {
      name: 'My Application',
      version: '1.0.0',
      description: 'This is a sample about.json file',
    };
  }
}
