import { Injectable } from '@nestjs/common';
import { CreatePathologicalReportDto } from './dto/update-patient.dto';
import { CreatePatientPartialDto } from './dto/partial-create-patient.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './repositories/patient.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PathologicalReport } from './entities/pathological-report.entity';
import { PathologicalIhcMarker } from './entities/pathological-ihc-marker.entity';
import { PathologicalRecommendation } from './entities/pathological-recommendation.entity';

@Injectable()
export class PatientService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
    @InjectRepository(PathologicalReport)
    private readonly pathologicalReportRepository: Repository<PathologicalReport>,
  ) {}
  async create(dto: CreatePatientPartialDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userToSave = this.patientRepository.create({
        birthDate: dto.birth_date,
        mothersName: dto.mothers_name,
        socialName: dto.social_name,
        whatsappPhone: dto.whatsapp_phone,
        ...dto,
      });

      const user = await queryRunner.manager.save(userToSave);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAllPaginated(pagination: PaginationDto) {
    return this.patientRepository.findAllPatientsPaginated(pagination);
  }

  findOne(id: string) {
    return this.patientRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updatePatientDto: CreatePathologicalReportDto) {
    const patient = await this.patientRepository.findOneOrFail({
      where: { id },
    });

    const savedPathologicalReport = this.pathologicalReportRepository.create({
      diagnosisGrade: updatePatientDto.diagnosisGrade,
      diagnosisType: updatePatientDto.diagnosisType,
      macroscopy: updatePatientDto.macroscopy,
      microscopy: updatePatientDto.microscopy,
      procedure: updatePatientDto.procedure,
      ihcMarkers: updatePatientDto.ihcMarkers as PathologicalIhcMarker[],
      recommendations:
        updatePatientDto.recommendations as PathologicalRecommendation[],
      patient,
    });

    return this.pathologicalReportRepository.save(savedPathologicalReport);
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
