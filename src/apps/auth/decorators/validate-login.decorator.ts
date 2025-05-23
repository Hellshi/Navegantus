import { applyDecorators, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';

export function ValidateLogin() {
  return applyDecorators(UseGuards(LocalAuthGuard));
}
