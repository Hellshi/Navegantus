import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
  .setTitle('Conciliação Gateway')
  .setDescription('Conciliação Gateway')
  .setVersion('0.1')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .addBearerAuth(undefined, 'refreshBearerAuth')
  .addBearerAuth(undefined, 'pdvRefreshBearerAuth')
  .addBasicAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
const logger = new Logger()
bootstrap().catch(error => logger.error(error));
