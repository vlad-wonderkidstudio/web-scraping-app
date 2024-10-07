import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapingModule } from './scraping/scraping.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig } from '../config/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mongoConfig,

      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ScrapingModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
