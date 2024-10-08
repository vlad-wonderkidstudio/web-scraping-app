import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ScrapingParamsDto {
  @ApiProperty({
    default: 'https://www.example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: true,
  })
  url: string;

  @IsString()
  id?: string;
}
