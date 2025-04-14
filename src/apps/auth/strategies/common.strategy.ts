import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from '@mestrak/passport-multi-jwt';

import { AuthConfigService } from '../../../configs/auth/auth.service';
import { JwtStrategy as DashboardJwtStrategy } from './jwt.strategy';

@Injectable()
export class CommonJwtStrategy extends PassportStrategy(
  Strategy,
  'common-jwt',
) {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwtStrategy: DashboardJwtStrategy,
  ) {
    super([
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: authConfigService.secret,
      }
    ]);
  }

  async validate(payload: any) {
    switch (payload.origin) {
        default:
        return this.jwtStrategy.validate(payload);
      }
  }
}
