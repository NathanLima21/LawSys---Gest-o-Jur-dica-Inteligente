import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // A MÁGICA ESTÁ AQUI: Libera o acesso para o Frontend
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();