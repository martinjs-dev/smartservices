import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiNewsService } from './api-news/api-news.service';
import { ApiNewsController } from './api-news/api-news.controller';
import { ApiBookModule } from './api-book/api-book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USER')}:${encodeURIComponent(configService.get<string>('DB_PASSWORD'))}@${configService.get<string>('DB_HOST')}/${configService.get<string>('DB_NAME')}?retryWrites=true&w=majority`,
      }),
    }),
    ApiBookModule,
  ],
  controllers: [AppController, ApiNewsController],
  providers: [AppService, ApiNewsService],
})
export class AppModule {}
