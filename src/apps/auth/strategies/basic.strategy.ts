import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { AuthConfigService } from '../../../configs/auth/auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  validate = async (
    request: Request,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      this.authConfigService.httpBasicUser === username &&
      this.authConfigService.httpBasicPass === password
    ) {
      return true;
    }
    throw new UnauthorizedException('Invalid credentials');
  };

  constructor(private readonly authConfigService: AuthConfigService) {
    super({
      passReqToCallback: true,
    });
  }
}
