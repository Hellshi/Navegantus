import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { RoleName } from '../enum/roles.enum';

@Entity()
export class Role extends BaseEntity<Role> {
  @ApiProperty()
  @Column({ enum: RoleName })
  name: RoleName;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  displayName: string;

  @ApiProperty({ type: () => User, isArray: true })
  @OneToMany(() => User, (user) => user.role)
  users: Relation<User[]>;
}
