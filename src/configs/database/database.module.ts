import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';
import { DatabaseConfigService } from './database.service';

@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_SYNCHRONIZE: Joi.boolean().required(),
        DATABASE_MIGRATERUN: Joi.boolean().required(),
      }),
    }),
  ],
})
export class DatabaseConfigModule {}
