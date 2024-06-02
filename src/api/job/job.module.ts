import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobSeeder } from './seeders/job-seeder';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobSeeder, JobService],
  controllers: [JobController],
  exports: [JobSeeder],
})
export class JobModule { }
