import { Controller, Post, Body, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateLogin } from './decorators/validate-login.decorator';
import { BasicAuth } from './decorators/basic-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

/* Dev's Note: Para a POC não teremos feature de forgot password, as senhas terão de ser resetadas manualmente
  Isso é para cortar custos com provedores de email.
*/
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ValidateLogin()
  @BasicAuth()
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any, @Body() dto: LoginDto) {
    return this.authService.login(req.user);
  }
}
