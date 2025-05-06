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
    return this.hospitalRepository.create(createHospitalDto);
  }

// Para a poc não haverá listagem de hospitais, porque ainda não haverá painel de admin para os masters
/*   findAll() {
    return `This action returns all hospital`;
  }
*/
  findOne(id: string) {
    return this.hospitalRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  update(id: string, updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalRepository.update(id, updateHospitalDto);
  }

  remove(id: string) {
    return `This action removes a #${id} hospital`;
  }
}
