import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { HospitalAddress } from './hospital-address.entity';
import { HospitalEmployee } from './hospital-employee.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  director: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  address: string;

  @OneToOne(() => HospitalAddress)
  @JoinColumn({ name: 'address' })
  hospitalAddress: HospitalAddress;

  @OneToMany(() => HospitalEmployee, (hospitalEmployee) => hospitalEmployee.hospital)
  employees: HospitalEmployee[];
}
