import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // In production it would be better to remove this end-point
    return 'Demo Scraping Service!';
  }
}
