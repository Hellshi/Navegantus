import { User } from 'src/apps/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PatientEntity } from './patient.entity';

//Lembre que a ideia disso é que sejam upload de documentos e etc
@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  external_id: string;

  @Column()
  url: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'patologist' })
  patologist: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'surgeon' })
  surgeon: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'radiologist' })
  radiologist: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'oncologist' })
  oncologist: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'radiotherapeut' })
  radioTherapist: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'nuclear_doctor' })
  nuclear_doctor: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pneumologist' })
  pneumologist: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'resident' })
  resident: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'navegant' })
  navegant: User;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;
}
