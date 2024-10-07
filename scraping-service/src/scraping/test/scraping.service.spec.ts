import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingService } from '../scraping.service';
import { ScrapingResult } from '../entities/scraping-result.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

describe('ScrapingService', () => {
  let service: ScrapingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScrapingService,
        {
          provide: getRepositoryToken(ScrapingResult),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ScrapingService>(ScrapingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
