import { Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalRepository } from './repositories/hospital.repository';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(HospitalRepository)
    private readonly hospitalRepository: HospitalRepository,
  ) {}
  create(createHospitalDto: CreateHospitalDto) {
    return 'This action adds a new hospital';
  }

  findAll() {
    return `This action returns all hospital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospital`;
  }

  update(id: number, updateHospitalDto: UpdateHospitalDto) {
    return `This action updates a #${id} hospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
