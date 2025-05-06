import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './configs/database/database.module';
import { PostgresModule } from './providers/postgres/postgres.module';
import { AuthModule } from './apps/auth/auth.module';
import { UserModule } from './apps/user/user.module';
import { AuthConfigModule } from './configs/auth/auth.module';
import { RoleModule } from './apps/role/role.module';
import { CommonRolesGuard } from './apps/auth/guards/common-roles-guard.service';
import { RolesGuard } from './apps/auth/guards/roles-guard.service';
import { HospitalModule } from './apps/hospital/hospital.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostgresModule,
    DatabaseConfigModule,
    AuthModule,
    UserModule,
    AuthConfigModule,
    RoleModule,
    HospitalModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'CommonRolesGuard',
      useClass: CommonRolesGuard,
    },
    {
      provide: 'RolesGuard',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
