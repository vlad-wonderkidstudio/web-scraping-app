import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ScrapingBackendService } from './scraping-backend.service';
import { ApiEndpointResponse } from 'src/common/interfaces/api-endpoint-response.interface';
import { TriggerScrapingDto } from './dto/trigger-scraping.dto';

@Controller('api')
export class ScrapingBackendController {
  private readonly logger = new Logger(ScrapingBackendController.name);

  constructor(
    private readonly scrapingBackendService: ScrapingBackendService,
  ) {}

  // It was possible to make it Get, I made it Post just to show that I can work with Posts as well
  @Post('scrape')
  async triggerScraping(
    @Body() triggerScrapingDto: TriggerScrapingDto,
  ): Promise<ApiEndpointResponse> {
    try {
      const res = await this.scrapingBackendService.triggerScraping(
        triggerScrapingDto.url,
      );

      return {
        data: res,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error(
        `Scraping service request failed. ${triggerScrapingDto.url}`,
        error.toString(),
      );
      // Note: in production I would not show all the error info, just log it, and show simple error
      // also for simplicity I always send HttpStatus.INTERNAL_SERVER_ERROR code here.
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Scraping service request failed. ${error.toString()}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('results')
  async getAllScrapingResults(): Promise<ApiEndpointResponse> {
    try {
      const res = await this.scrapingBackendService.getAllScrapingResults();

      return {
        data: res,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error('Failed to fetch scraping results', error.toString());
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to fetch scraping results. ${error.toString()}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
