import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGGER Api documentation
  const config = new DocumentBuilder()
    .setTitle('Courses Platform')
    .setDescription('this is a API system to a course platform base')
    .setVersion('1.0')
    .addTag('courses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
