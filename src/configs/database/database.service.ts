import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get port(): number {
    return this.configService.get<number>('database.port');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get dropSchema(): boolean {
    return this.isTestEnvironment;
  }

  get databaseName(): string {
    return this.configService.get<string>('database.db');
  }

  get entities(): string {
    if (this.isTestEnvironment) {
      return 'src/**/*.entity{.ts,.js}';
    }

    return 'dist/**/*.entity{.ts,.js}';
  }

  get migrations(): string {
    if (this.isTestEnvironment) {
      return 'src/migrations/*.ts';
    }
    return 'dist/**/migrations/*.js';
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('database.synchronize');
  }

  get migrationsRun(): boolean {
    return this.configService.get<boolean>('database.migrationsRun');
  }

  private get isTestEnvironment(): boolean {
    return process.env.NODE_ENV === 'test';
  }
}
