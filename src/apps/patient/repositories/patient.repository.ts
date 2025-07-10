import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../entities/patient.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PatientRepository extends BaseRepository<PatientEntity> {
  constructor(
    @InjectRepository(PatientEntity)
    private repository: BaseRepository<PatientEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllPatientsPaginated({ limit = 10, page = 1 }: PaginationDto) {
    const query = this.createQueryBuilder('patient');
    return query
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }
}
