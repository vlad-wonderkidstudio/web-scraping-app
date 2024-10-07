import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingBackendController } from '../scraping-backend.controller';
import { ScrapingBackendService } from '../scraping-backend.service';

const mockScrapingBackendService = {
  scrapeWebsite: jest.fn(),
  getAllScrapingResults: jest.fn(),
};

describe('ScrapingController', () => {
  let controller: ScrapingBackendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapingBackendController],
      providers: [
        {
          provide: ScrapingBackendService,
          useValue: mockScrapingBackendService,
        },
      ],
    }).compile();

    controller = module.get<ScrapingBackendController>(
      ScrapingBackendController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
