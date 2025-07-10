import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { PatientRepository } from './repositories/patient.repository';
import { PathologicalReport } from './entities/pathological-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, PathologicalReport])],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
})
export class PatientModule {}
