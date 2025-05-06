import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/entities/role.entity';
import { RoleRepository } from '../role/repositories/role.repository';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([User, Role, RefreshToken])],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository],
  exports: [UserService],
})
export class UserModule {}
