import { NestFactory } from '@nestjs/core';
import { existsSync, readFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const crPath = '/etc/letsencrypt/live/tracknet.one/fullchain.pem';
  const pkPath = '/etc/letsencrypt/live/tracknet.one/privkey.pem';
  const options: any = {};
  if (existsSync(crPath) && existsSync(pkPath)) {
    // cargamos los archivos sobre las options
    options.httpsOptions = {
      cert: readFileSync(crPath),
      key: readFileSync(pkPath),
    };
  }
  const app = await NestFactory.create(AppModule, options);

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
