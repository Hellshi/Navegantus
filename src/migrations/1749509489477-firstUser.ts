/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import config from '../configs/auth/configuration';
import { Role } from 'src/apps/role/entities/role.entity';
import { User } from 'src/apps/user/entities/user.entity';
import { BirthSex } from 'src/apps/user/enums/birthSext.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstUser1749509489477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role = await queryRunner.query(
      `SELECT id
       FROM role
       WHERE name = 'MASTER'`,
    );

    const admin = new User({
      name: 'Master Admin',
      email: config().masterAdminEmail,
      password: config().masterAdminPassword,
      role: { id: role[0].id } as Role,
      birthSex: BirthSex.FEMALE,
      phone: '99999999999',
      cpf: '99999999999',
    });

    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.findOne(User, {
      where: {
        email: config().masterAdminEmail,
      },
    });

    await queryRunner.manager.remove(user);
  }
}
