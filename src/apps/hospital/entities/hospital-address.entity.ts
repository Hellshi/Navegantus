import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StateEnum } from '../enum/state';
import { Hospital } from './hospital.entity';

@Entity('hospital_address')
export class HospitalAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  cep: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'enum', enum: StateEnum })
  state: StateEnum;

  @Column({ type: 'varchar' })
  neighborhood: string;

  @OneToOne(() => Hospital, (hospital) => hospital.address)
  hospital: Hospital;
}
