import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientRepository extends BaseRepository<Patient> {
  constructor(
    @InjectRepository(Patient)
    private repository: BaseRepository<Patient>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
