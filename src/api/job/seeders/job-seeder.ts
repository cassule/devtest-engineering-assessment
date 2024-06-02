import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobSeeder {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) { }

  async seed() {
    const filePath = path.join(__dirname, '..', 'data', 'jobs.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jobsData = JSON.parse(fileContent);

    for (const jobData of jobsData) {
      const job = this.jobRepository.create({
        ...jobData,
        createdAt: new Date(jobData.createdAt),
      });
      await this.jobRepository.save(job);
    }
  }
}
