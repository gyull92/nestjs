import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('cqrs')
    .setDescription('cqrs api')
    .setVersion('1.0,0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  delete document.paths['/'];
  SwaggerModule.setup('cqrs', app, document);

  await app.listen(3300);
}
bootstrap();
