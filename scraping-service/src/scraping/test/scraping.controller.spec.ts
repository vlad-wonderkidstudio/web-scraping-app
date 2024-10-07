import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingController } from '../scraping.controller';
import { ScrapingService } from '../scraping.service';

const mockScrapingService = {
  scrapeWebsite: jest.fn(),
  getAllScrapingResults: jest.fn(),
};

describe('ScrapingController', () => {
  let controller: ScrapingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapingController],
      providers: [
        {
          provide: ScrapingService,
          useValue: mockScrapingService,
        },
      ],
    }).compile();

    controller = module.get<ScrapingController>(ScrapingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
