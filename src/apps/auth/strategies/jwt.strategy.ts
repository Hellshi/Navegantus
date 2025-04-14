import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../../apps/user/repositories/user.repository';

@Injectable()
export class JwtStrategy {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async validate(payload: any) {
    const { id } = payload;

    const user = await this.userRepository.findOneByIdWithRoles(id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      role: user.role.name,
      name: user.name,
      origin: payload.origin,
    };
  }
}
