import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AuthConfigService } from './auth.service';
import configuration from './configuration';

@Module({
  providers: [AuthConfigService],
  exports: [AuthConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().required(),
        HTTP_BASIC_USER: Joi.string().required(),
        HTTP_BASIC_PASS: Joi.string().required(),
      }),
    }),
  ],
})
export class AuthConfigModule {}
