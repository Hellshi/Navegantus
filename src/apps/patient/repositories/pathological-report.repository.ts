import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PathologicalReport } from '../entities/pathological-report.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

interface PaginatedRequest {
  id: string;
  pagination: PaginationDto;
}

@Injectable()
export class PathologyReportRepository extends BaseRepository<PathologicalReport> {
  constructor(
    @InjectRepository(PathologicalReport)
    private repository: BaseRepository<PathologicalReport>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllByPatientPaginated({ id, pagination }: PaginatedRequest) {
    const { limit = 10, page = 1 } = pagination;
    const query = this.createQueryBuilder('patient');
    return query
      .where('patient_id = :id', { id })
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }
}
