import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { HospitalAddress } from './hospital-address.entity';
import { HospitalEmployee } from './hospital-employee.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/apps/user/entities/user.entity';

@Entity('hospitals')
export class Hospital {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  cnpj: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  directorId: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  addressId: string;

  @OneToOne(() => HospitalAddress, (address) => address.hospital)
  @JoinColumn({ name: 'address' })
  address: HospitalAddress;

  @OneToMany(
    () => HospitalEmployee,
    (hospitalEmployee) => hospitalEmployee.hospital,
  )
  employees: HospitalEmployee[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'directorId' })
  director: User;
}
