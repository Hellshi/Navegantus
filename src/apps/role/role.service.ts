import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleRepository } from './repositories/role.repository';
import { RoleName } from './enum/roles.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  async findAll() {
    return this.roleRepository.find();
  }

  async findOneOrFail(id: string) {
    return this.roleRepository.findOneByCriteriaOrFail({
      id,
    });
  }

  getDefaultRole() {
    return this.roleRepository.findOneByCriteriaOrFail({
      name: RoleName.STAFF,
    });
  }
}
