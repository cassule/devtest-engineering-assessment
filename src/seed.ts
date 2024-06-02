import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'
import { JobSeeder } from './api/job/seeders/job-seeder';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobSeeder = app.get(JobSeeder);
  await jobSeeder.seed();
  await app.close();
}

bootstrap();
