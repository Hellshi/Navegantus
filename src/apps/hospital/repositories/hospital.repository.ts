import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base-repository';
import { Hospital } from '../entities/hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HospitalRepository extends BaseRepository<Hospital> {
  constructor(
    @InjectRepository(Hospital)
    private repository: BaseRepository<Hospital>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
