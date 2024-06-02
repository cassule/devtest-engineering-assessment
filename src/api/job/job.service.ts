import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) { }

  async findAll(page: number, limit: number, filters: any) {
    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    if (filters.title) {
      queryBuilder.andWhere('job.role LIKE :title', { title: `%${filters.title}%` });
    }

    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'DESC' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`job.${filters.sortBy}`, sortOrder);
    }

    const [jobs, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: jobs,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }
}
