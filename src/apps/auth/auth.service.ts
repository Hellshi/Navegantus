import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthConfigService } from '../../configs/auth/auth.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    /* @Inject(forwardRef(() => UserService))
    private readonly userService: UserService, */
    private readonly jwtService: JwtService,
    private readonly authConfigService: AuthConfigService,
  ) {}

  async login(user: User) {
    const { token, refreshToken } = await this.generateTokens(user);

    return {
      token,
      refreshToken,
      user: this.formatUserToReturn(user),
    };
  }

  private async generateTokens(user: User) {
    const token = await this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      token,
      refreshToken,
    };
  }

  private async generateRefreshToken(user: User) {
    const payload = this.formatUserPayload(user);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.refreshExpiration,
      secret: this.authConfigService.refreshSecret,
    });

    //TODO: Uncomment later
    //await this.userService.updateRefreshToken(user.id, refreshToken);

    return refreshToken;
  }

  private async generateToken(user: User) {
    const payload = this.formatUserPayload(user);

    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.expiration,
      secret: this.authConfigService.secret,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmailWithRoles(email);

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    await this.validatePassword(user, password);

    return user;
  }

  private async validatePassword(user: User, password: string) {
    if (!user.password || !user.comparePassword(password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private formatUserToReturn(user: User) {
    return {
      id: user.id,
      role: user.role?.name,
      roleId: user.role?.id,
      email: user.email,
      name: user.name,
    };
  }

  private formatUserPayload(user: User) {
    return {
      id: user.id,
      role: user.role?.name,
      name: user.name,
    };
  }

  async loginViaRefreshToken(user: User) {
    const { token, refreshToken } = await this.generateTokens(user);

    return {
      token,
      refreshToken,
      user: this.formatUserToReturn(user),
    };
  }
}
