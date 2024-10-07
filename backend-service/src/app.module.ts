import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingBackendModule } from './scraping-backend/scraping-backend.module';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig } from '../config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mongoConfig,

      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ScrapingBackendModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
