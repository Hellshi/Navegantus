import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { StateEnum } from '../enum/state';

@Entity('hospital_address')
export class HospitalAddress {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  cep: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  city: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: StateEnum })
  state: StateEnum;

  @ApiProperty()
  @Column({ type: 'varchar' })
  neighborhood: string;
}
