import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { UserService } from '../../user/user.service';
import { AuthConfigService } from '../../../configs/auth/auth.service';
import { User } from '../../../apps/user/entities/user.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authConfigService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfigService.refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<User> {
    const refreshToken = request.headers.authorization?.replace('Bearer ', '');

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const jwtDecoded = this.jwtService.decode(refreshToken);

    if (!jwtDecoded || typeof jwtDecoded !== 'object' || jwtDecoded['exp'] < Date.now() / 1000) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.verifyRefreshToken({
      id: payload.id,
      refreshToken,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async verifyRefreshToken({
    id,
    refreshToken,
  }: {
    id: string;
    refreshToken: string;
  }): Promise<User> {
    return this.userService.verifyRefreshToken(id, refreshToken);
  }
}
