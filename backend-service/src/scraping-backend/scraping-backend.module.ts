import { Module } from '@nestjs/common';
import { ScrapingBackendController } from './scraping-backend.controller';
import { ScrapingBackendService } from './scraping-backend.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ScrapingBackendController],
  providers: [ScrapingBackendService, ScrapingBackendController, ConfigService],
  exports: [ScrapingBackendService, ScrapingBackendController, ConfigService],
})
export class ScrapingBackendModule {}
