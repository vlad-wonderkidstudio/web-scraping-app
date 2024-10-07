import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapingService } from './scraping.service';
import { ScrapingController } from './scraping.controller';
import { ScrapingResult } from './entities/scraping-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapingResult])],
  providers: [ScrapingService, ScrapingController],
  controllers: [ScrapingController],
  exports: [ScrapingService, ScrapingController],
})
export class ScrapingModule {}
