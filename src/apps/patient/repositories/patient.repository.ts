import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../entities/patient.entity';

@Injectable()
export class PatientRepository extends BaseRepository<PatientEntity> {
  constructor(
    @InjectRepository(PatientEntity)
    private repository: BaseRepository<PatientEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
