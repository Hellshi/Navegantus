import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { User } from '../user/entities/user.entity';
import { BasicStrategy } from './strategies/basic.strategy';
import { CommonJwtStrategy } from './strategies/common.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../../configs/auth/configuration';
import { AuthConfigModule } from 'src/configs/auth/auth.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: config().secret,
    signOptions: { expiresIn: config().expiration },
  }),
  AuthConfigModule,
  UserModule,
  RoleModule,
  PassportModule,
],
  controllers: [AuthController],
  providers: [
    AuthService,
    BasicStrategy,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    CommonJwtStrategy,
  ],
})
export class AuthModule {}
