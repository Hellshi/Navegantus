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

  async findOneOrFail(id: RoleName) {
    if (id === RoleName.MASTER) {
      throw new Error('Master users cannot be created');
    }
    return this.roleRepository.findOneByCriteriaOrFail({
      name: id,
    });
  }

  getDefaultRole() {
    return this.roleRepository.findOneByCriteriaOrFail({
      name: RoleName.STAFF,
    });
  }
}
