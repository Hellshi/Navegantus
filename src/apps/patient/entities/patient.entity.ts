import { BirthSex } from 'src/apps/user/enums/birthSext.enum';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { PatientAddress } from './patient-address.entity';
import { MedicalRecord } from './medical-record.entity';

export enum HealthInsurance {
  Public = 'Public',
  Private = 'Private',
  None = 'None',
}

@Entity('patients')
export class Patient extends BaseEntity<Patient> {
  @Column()
  name: string;

  @Column({ nullable: true })
  socialName: string;

  @Column()
  birthDate: string;

  @Column()
  mothersName: string;

  @Column()
  rg: string;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  susIdCard: string;

  @Column({
    type: 'enum',
    enum: HealthInsurance,
    nullable: true,
  })
  healthInsurance: HealthInsurance;

  @Column({
    type: 'enum',
    enum: BirthSex,
  })
  birthSex: BirthSex;

  @Column({ type: 'uuid' })
  addressId: string;

  @OneToOne(() => PatientAddress, (address) => address.patient)
  @JoinColumn({ name: 'address' })
  address: PatientAddress;

  @OneToMany(() => MedicalRecord, (record) => record.patient)
  medicalRecords: MedicalRecord[];

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  whatsappPhone: string;
}
