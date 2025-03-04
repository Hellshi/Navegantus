import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
//import { CommonJwtAuth } from '../auth/decorators/common-auth.decorator';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get()
  //@CommonJwtAuth()
  async findAll() {
    return this.rolesService.findAll();
  }
}
