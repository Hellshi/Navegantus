import { forwardRef, Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { LocationPermissionModule } from '../location-permission/location-permission.module';
import { Role } from '../role/entities/role.entity';
import { RoleRepository } from '../role/repositories/role.repository';
import { CodeModule } from '../code/code.module';
import { RefreshToken } from './entities/refresh-token.entity';
import { EmailModule } from '../email/email.module';
import { EmailConfigModule } from '../../configs/email/email.module';
import { ChurchModule } from '../church/church.module';

@Module({
  imports: [
    RoleModule,
    LocationPermissionModule,
    CodeModule,
    EmailModule,
    EmailConfigModule,
    forwardRef(() => ChurchModule),
    TypeOrmModule.forFeature([User, Role, RefreshToken]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository],
  exports: [UserService],
})
export class UserModule {}
