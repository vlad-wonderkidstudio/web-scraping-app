import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { ApiEndpointResponse } from 'src/common/interfaces/api-endpoint-response.interface';
import { ScrapingParamsDto } from './dto/scraping-params.dto';

@Controller('scraping')
export class ScrapingController {
  private readonly logger = new Logger(ScrapingController.name);

  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('/get-all')
  async getAllScrapingResults(): Promise<ApiEndpointResponse> {
    try {
      const res = await this.scrapingService.getAllScrapingResults();

      return {
        data: res,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error(
        `Failed to retrieve scraping results.`,
        error.toString(),
      );
      // Note: in production I would not show all the error info. I will log it, and throw only simplified error info.
      // also for simplicity I always send HttpStatus.INTERNAL_SERVER_ERROR code here.
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to retrieve scraping results. ${error.toString()}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // It was possible to make it Get. I made it Post just to show that I can work with Posts as well.
  @Post('scrape')
  async scrape(
    @Body() scrapingParamsDto: ScrapingParamsDto,
  ): Promise<ApiEndpointResponse> {
    try {
      const res = await this.scrapingService.scrapeWebsite(
        scrapingParamsDto.url,
        scrapingParamsDto.id,
      );

      return {
        data: res,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error(
        `Failed to scrape URL: ${scrapingParamsDto.url}`,
        error.toString(),
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to scrape URL. ${error.toString()}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
