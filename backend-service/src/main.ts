import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const swaggerPath: string = '/swager';

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Scraping Service API documentation')
    .setVersion('1.0')
    .addTag('scraping')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('SERVICE_PORT');
  logger.log(`Service is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
