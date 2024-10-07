import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
//import * as cheerio from 'cheerio';
import { ScrapingResult } from './entities/scraping-result.entity';
//import { ApiEndpointResponse } from 'src/common/interfaces/api-endpoint-response.interface';

@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);
  private readonly MAX_ITEMS_TO_RETURN = 1000;

  constructor(
    @InjectRepository(ScrapingResult)
    private readonly scrapingResultRepository: Repository<ScrapingResult>,
  ) {}

  async scrapeWebsite(url: string): Promise<ScrapingResult> {
    try {
      const { data: htmlContent } = await axios.get(url);
      this.logger.log(`Successfully fetched HTML content for URL: ${url}`);

      const urlRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
      const domainRegex = /https?:\/\/([a-z0-9.-]+)[\/]?/i;

      let urls: string[] = htmlContent.match(urlRegex) || [];
      urls = [...new Set(urls)]; // Get rid of duplicate urls

      const domains: string[] = [
        ...new Set(
          urls
            .map((url) => {
              const match = url.match(domainRegex);
              return match ? match[1] : '';
            })
            .filter((domain) => domain),
        ),
      ];

      this.logger.log(
        `Extracted ${urls.length} URLs and ${domains.length} domains from URL: ${url}`,
      );

      const scrapingResult = this.scrapingResultRepository.create({
        url,
        domains,
        domainsCount: domains.length,
        foundUrls: urls,
        foundUrlsCount: urls.length,
        createdAt: new Date(),
      });

      return await this.scrapingResultRepository.save(scrapingResult);
    } catch (error) {
      throw new Error(
        `Failed to extract and save links for URL: "${url}". ${error.toString()}`,
      );
    }
  }

  async getAllScrapingResults(): Promise<ScrapingResult[]> {
    try {
      const results = await this.scrapingResultRepository.find({
        select: ['_id', 'url', 'domainsCount', 'foundUrlsCount', 'createdAt'],
        take: this.MAX_ITEMS_TO_RETURN,
      });

      if (!results?.length) {
        return [];
      }

      return results;
    } catch (error) {
      this.logger.error(
        'Failed to retrieve scraping results',
        error.toString(),
      );
      throw new Error(
        `Failed to retrieve scraping results. ${error.toString()}`,
      );
    }
  }
}
