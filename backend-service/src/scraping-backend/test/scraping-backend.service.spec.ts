import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingBackendService } from '../scraping-backend.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mockConfigService = {
  create: jest.fn(),
  get: jest.fn(() => 'http://example.com'),
};

describe('ScrapingBackendService', () => {
  let service: ScrapingBackendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ScrapingBackendService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ScrapingBackendService>(ScrapingBackendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
