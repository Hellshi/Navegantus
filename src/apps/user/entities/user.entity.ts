import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { BaseEntity } from '../../../common/entities/base.entity';
import { BirthSext } from '../enums/birthSext.enum';
import { Role } from 'src/apps/role/entities/role.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity()
export class User extends BaseEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ name: 'birth_sex', enum: BirthSext })
  birthSex: BirthSext;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  crm: string;

  @Column({ unique: true, nullable: true })
  cre: string;

  @Column({ nullable: true, name: 'role_id' })
  roleId?: string;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Relation<Role>;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  refreshToken: Relation<RefreshToken>;

  @BeforeInsert()
  hashPassword(): void {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeUpdate()
  hash(): void {
    this.hashPassword();
  }

  comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password);
  }
}
