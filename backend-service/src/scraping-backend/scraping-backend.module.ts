import { Module } from '@nestjs/common';
import { ScrapingBackendController } from './scraping-backend.controller';
import { ScrapingBackendService } from './scraping-backend.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapingResult } from './entities/scraping-result.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ScrapingResult])],
  controllers: [ScrapingBackendController],
  providers: [ScrapingBackendService, ScrapingBackendController, ConfigService],
  exports: [ScrapingBackendService, ScrapingBackendController, ConfigService],
})
export class ScrapingBackendModule {}
