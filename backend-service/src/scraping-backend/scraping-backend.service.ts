import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ApiEndpointResponse } from 'src/common/interfaces/api-endpoint-response.interface';
import { ScrapeRecord } from 'src/common/interfaces/scrape-record.interface';

@Injectable()
export class ScrapingBackendService {
  private readonly logger = new Logger(ScrapingBackendService.name);
  private readonly scrapingServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.scrapingServiceUrl = this.configService.get<string>(
      'SCRAPING_SERVICE_API_URL',
      '',
    );
    if (!this.scrapingServiceUrl) {
      throw new Error('SCRAPING_SERVICE_API_URL is not defined');
    }
  }

  async triggerScraping(url: string): Promise<ScrapeRecord> {
    try {
      const apiUrl = `${this.scrapingServiceUrl}/scrape`;
      const response = await axios.post<ApiEndpointResponse>(apiUrl, { url });

      if (!this.isScrapeRecord(response?.data?.data) || response?.data?.error) {
        throw new Error(
          'Scraping service returned error request. ' + response?.data?.error,
        );
      }

      this.logger.log(`Successfully triggered scraping for URL: ${url}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        `Failed to trigger scraping for URL "${url}". ${error.toString()}`,
      );
    }
  }

  async getAllScrapingResults(): Promise<ScrapeRecord[]> {
    try {
      const apiUrl = `${this.scrapingServiceUrl}/get-all`;
      console.log('apiUrl', apiUrl);
      const response = await axios.get<ApiEndpointResponse>(apiUrl);

      if (
        !this.isScrapeRecords(response?.data?.data) ||
        response?.data?.error
      ) {
        throw new Error(
          'Scraping service returned error. ' + response?.data?.error,
        );
      }

      this.logger.log(`Successfully get the scraping execution results`);
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch scraping results. ${error.toString()}`);
    }
  }

  isScrapeRecord(data: unknown): data is ScrapeRecord {
    return !!(data as ScrapeRecord)?._id;
  }

  isScrapeRecords(data: unknown): data is ScrapeRecord[] {
    if (data === undefined || data === null) {
      return false;
    }
    return !!(
      Array.isArray(data) &&
      (data.length === 0 || (data[0] as ScrapeRecord)._id)
    );
  }
}
