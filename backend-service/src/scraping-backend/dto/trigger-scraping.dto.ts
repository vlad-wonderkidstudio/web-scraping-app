import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class TriggerScrapingDto {
  @ApiProperty({
    default: 'https://www.example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: true,
  })
  url: string;
}
