import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('api/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, enum: ['ASC', 'DESC'] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    const filters = { title, sortBy, sortOrder };
    return this.jobService.findAll(page, limit, filters);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: String })
  async findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }
}
