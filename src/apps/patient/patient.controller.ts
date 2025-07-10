import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleName } from '../role/enum/roles.enum';
import { CreatePatientPartialDto } from './dto/partial-create-patient.dto';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CommonJwtAuth } from '../auth/decorators/common-auth.decorator';
import { CreatePathologicalReportDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Roles(RoleName.HEALTH_STAFF, RoleName.STAFF)
  create(@Body() createPatientDto: CreatePatientPartialDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post('partial-register')
  partialRegister(@Body() createPatientDto: CreatePatientPartialDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @CommonJwtAuth()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  find(@Query() pagination: PaginationDto) {
    return this.patientService.findAllPaginated(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch('add-pathological-report/:id')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: CreatePathologicalReportDto,
  ) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
