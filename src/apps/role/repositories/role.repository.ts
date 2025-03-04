import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepository } from '../../../common/repository/base-repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private repository: BaseRepository<Role>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
