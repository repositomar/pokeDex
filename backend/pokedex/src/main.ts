import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

function configurationSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('Pokemon REST API')
    .setDescription('Api for Pokemon')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('pokemon-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port: number = configService.get('http.port');

  configurationSwagger(app);
  await app
    .listen(port, '0.0.0.0')
    .then(() =>
      new Logger('bootstrap').log(`Application listening on port ${port}`),
    );
}
bootstrap().then(() => Logger.log('Bootstrap ended'));
