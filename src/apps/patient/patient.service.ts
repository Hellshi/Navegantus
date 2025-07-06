import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreatePatientPartialDto } from './dto/partial-create-patient.dto';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './repositories/patient.repository';

@Injectable()
export class PatientService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
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

  createPartialPatient(createPatientDto: CreatePatientPartialDto) {
    return 'This action adds a new patient';
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
