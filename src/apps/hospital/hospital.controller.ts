import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { CommonJwtAuth } from '../auth/decorators/common-auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleName } from '../role/enum/roles.enum';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @CommonJwtAuth()
  @Roles(RoleName.MASTER)
  //TODO: Adicionar o decorator de Role
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  /*   @Get()
  findAll() {
    return this.hospitalService.findAll();
  } */

  @Get(':id')
  @CommonJwtAuth()
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @Patch(':id')
  @CommonJwtAuth()
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalService.update(id, updateHospitalDto);
  }

  @Delete(':id')
  @CommonJwtAuth()
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(id);
  }
}
