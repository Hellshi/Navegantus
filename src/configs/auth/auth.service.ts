import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('auth.secret');
  }

  get refreshSecret(): string {
    return this.configService.get<string>('auth.refreshSecret');
  }

  get expiration(): string {
    return this.configService.get<string>('auth.expiration');
  }

  get refreshExpiration(): string {
    return this.configService.get<string>('auth.refreshExpiration');
  }

  get masterAdminEmail(): string {
    return this.configService.get<string>('auth.masterAdminEmail');
  }

  get masterAdminPassword(): string {
    return this.configService.get<string>('auth.masterAdminPassword');
  }

  get httpBasicUser(): string {
    return this.configService.get<string>('auth.httpBasicUser');
  }

  get httpBasicPass(): string {
    return this.configService.get<string>('auth.httpBasicPass');
  }
}
