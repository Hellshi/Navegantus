import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../common/repository/base-repository';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RoleName } from 'src/apps/role/enum/roles.enum';
import { visibleUserByRoles } from '../helpers/transformRole';

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

    return query.where('user.id = :id', { id }).getOne();
  }

  async findOneByEmailWithRoles(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoin('user.role', 'role')
      .select(['user.id', 'user.email', 'user.name', 'user.password', 'role'])
      .getOne();
  }

  async findOneByIdWithRoles(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoin('user.role', 'role')
      .select(['user.id', 'user.email', 'user.name', 'role'])
      .getOne();
  }

  async findAllUsersPaginated(
    { limit = 10, page = 1 }: PaginationDto,
    role: RoleName,
  ) {
    const skip = (page - 1) * limit;
    const roles = visibleUserByRoles(role);
    //TODO: Add filters here
    return this.createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .where('role.name IN (:...roles)', { roles })
      .select([
        'user.id',
        'user.email',
        'user.name',
        'user.createdAt',
        'user.phone',
        'role.name',
      ])
      .take(limit)
      .skip(skip)
      .getMany();
  }
}
