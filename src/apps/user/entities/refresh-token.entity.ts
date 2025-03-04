import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

import { User } from './user.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class RefreshToken extends BaseEntity<RefreshToken> {
  @Column()
  token: string;

  @OneToOne(() => User, (user) => user.refreshToken, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  async hashToken() {
    if (this.token) {
      const hash = createHash('sha256').update(this.token).digest('hex');

      this.token = await bcrypt.hash(hash, 8);
    }
  }

  compareToken(attempt: string) {
    const hash = createHash('sha256').update(attempt).digest('hex');

    return bcrypt.compareSync(hash, this.token);
  }
}
