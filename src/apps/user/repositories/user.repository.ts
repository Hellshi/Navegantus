import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../common/repository/base-repository';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private repository: BaseRepository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findById(id: string) {
    const query = this.createQueryBuilder('user');

    this.applyUserJoinsAndSelect(query);

    return query.where('user.id = :id', { id }).getOne();
  }

  async findExistingUserByExternalId(id: string) {
    return await this.findOne({
      where: { id },
      relations: [
        'role',
        'locationPermission',
        'church',
        'church.region',
        'church.region.block',
        'church.region.block.state',
      ],
    });
  }

  private applyUserJoinsAndSelect(query: SelectQueryBuilder<User>) {
    query
      .leftJoin('user.church', 'church')
      .leftJoin('church.region', 'region')
      .leftJoin('region.block', 'block')
      .leftJoin('block.state', 'state')
      .leftJoin('user.role', 'role')
      .leftJoin('user.locationPermission', 'locationPermission')
      .leftJoin('locationPermission.state', 'locationPermissionState')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.status',
        'user.lastLogin',
        'user.createdAt',
        'church',
        'region',
        'block',
        'state',
        'role',
        'locationPermission.id',
        'locationPermissionState',
      ]);
  }
}
