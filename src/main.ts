import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './domain/base/all-exceptions.filter';
import { TypeErrorFilter } from './domain/base/type-error-exceptions.filter';
import { getSecretValue } from './loadsecrets';

require('dotenv').config();

async function bootstrap() {
  try {
    var secrets = getSecretValue()
    for (const key in secrets) {
      process.env[key] = secrets[key];
    }
    console.log(secrets)
    console.log('Segredos carregados com sucesso!');
    } catch (err) {
      console.error('Erro ao carregar os segredos:', err);
    }
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new TypeErrorFilter());

  const config = new DocumentBuilder()
  .setTitle('Dog Restaurant API')
  .setDescription('API que gerencia os pedidos da lanchonete')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  
}

bootstrap();
