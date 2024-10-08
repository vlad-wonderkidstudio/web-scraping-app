import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ApiEndpointResponse } from 'src/common/interfaces/api-endpoint-response.interface';
import { ScrapeRecord } from 'src/common/interfaces/scrape-record.interface';
import { ScrapingResult } from './entities/scraping-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RecordStatusType } from '../common/types/record-status.type';

@Injectable()
export class ScrapingBackendService {
  private readonly logger = new Logger(ScrapingBackendService.name);
  private readonly scrapingServiceUrl: string;

  constructor(
    @InjectRepository(ScrapingResult)
    private readonly scrapingResultRepository: Repository<ScrapingResult>,
    private readonly configService: ConfigService,
  ) {
    this.scrapingServiceUrl = this.configService.get<string>(
      'SCRAPING_SERVICE_API_URL',
      '',
    );
    if (!this.scrapingServiceUrl) {
      throw new Error('SCRAPING_SERVICE_API_URL is not defined');
    }
  }

  async triggerScraping(url: string): Promise<ScrapeRecord> {
    let id: string;
    try {
      id = await this.writeStatus('pending' as const, id);
    } catch (error) {
      throw new Error('Failed to initialize status' + error.toString());
    }
    try {
      const apiUrl = `${this.scrapingServiceUrl}/scrape`;
      const response = await axios.post<ApiEndpointResponse>(apiUrl, {
        id,
        url,
      });

      if (!this.isScrapeRecord(response?.data?.data) || response?.data?.error) {
        throw new Error(
          'Scraping service returned error request. ' + response?.data?.error,
        );
      }

      this.logger.log(`Successfully triggered scraping for URL: ${url}`);
      this.writeStatus('completed' as const, id);
      return response.data.data;
    } catch (error) {
      this.writeStatus('failed' as const, id);
      throw new Error(
        `Failed to trigger scraping for URL "${url}". ${error.toString()}`,
      );
    }
  }

  async writeStatus(
    status: RecordStatusType,
    id?: string,
  ): Promise<string | undefined> {
    if (!id) {
      const scrapingResult = this.scrapingResultRepository.create({
        status,
      });
      const res = await this.scrapingResultRepository.save(scrapingResult);
      return String(res._id);
    } else {
      await this.scrapingResultRepository.update(
        { _id: new ObjectId(id) },
        { status },
      );
    }
  }

  async getAllScrapingResults(): Promise<ScrapeRecord[]> {
    try {
      const apiUrl = `${this.scrapingServiceUrl}/get-all`;
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
