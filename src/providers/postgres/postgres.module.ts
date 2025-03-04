import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

import { TypeormService } from './typeorm.service';
import { DatabaseConfigModule } from 'src/configs/database/database.module';
import { DatabaseConfigService } from 'src/configs/database/database.service';

@Module({
  imports: [
    DatabaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfig: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.databaseName,
        dropSchema: databaseConfig.dropSchema,
        migrationsTableName: 'migration',
        entities: [databaseConfig.entities],
        migrations: [databaseConfig.migrations],
        migrationsTransactionMode: 'each',
        uuidExtension: 'uuid-ossp',
        installExtensions: true,
        cli: {
          migrationsDir: join(__dirname, 'src', 'migrations'),
        },
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [DatabaseConfigService],
    }),
  ],
  providers: [TypeormService],
})
export class PostgresModule {}
