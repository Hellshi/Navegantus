import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DatabaseConfigService } from 'src/configs/database/database.service';
import { DataSource } from 'typeorm';


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
