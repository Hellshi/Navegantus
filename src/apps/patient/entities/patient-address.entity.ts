import { StateEnum } from 'src/apps/hospital/enum/state';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';

@Entity('patient_address')
export class PatientAddress {
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

  @OneToOne(() => PatientEntity, (patient) => patient.address)
  patient: PatientEntity;
}
