import { applyDecorators, UseGuards } from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { CommonAuthGuard } from '../guards/common.guard';
import { CommonRolesGuard } from '../guards/common-roles-guard.service';

export function CommonJwtAuth() {
  return applyDecorators(
    UseGuards(CommonAuthGuard, CommonRolesGuard),
    ApiBearerAuth('defaultBearerAuth'),
  );
}
