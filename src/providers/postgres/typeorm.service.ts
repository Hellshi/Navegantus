import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DatabaseConfigService } from '../../../configs/database/database.service';

@Injectable()
export class TypeormService implements OnModuleInit {
  private logger = new Logger(TypeormService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly databaseConfig: DatabaseConfigService,
  ) {}

  async onModuleInit() {
    await this.synchronizeDatabase();
    await this.runMigrations();
  }

  async synchronizeDatabase() {
    if (this.databaseConfig.synchronize) {
      this.logger.log('Synchronizing database...');
      await this.dataSource.synchronize();
    }
  }

  async runMigrations() {
    if (this.databaseConfig.migrationsRun) {
      this.logger.log('Running migrations...');
      await this.dataSource.runMigrations();
    }
  }
}
