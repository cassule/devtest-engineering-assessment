import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobSeeder } from './seeders/job-seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobSeeder],
  exports: [JobSeeder],
})
export class JobModule { }
