import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  expiration: process.env.JWT_EXPIRATION,
  refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  masterAdminEmail: process.env.MASTER_ADMIN_EMAIL,
  masterAdminPassword: process.env.MASTER_ADMIN_PASSWORD,
  httpBasicUser: process.env.HTTP_BASIC_USER,
  httpBasicPass: process.env.HTTP_BASIC_PASS,
}));
