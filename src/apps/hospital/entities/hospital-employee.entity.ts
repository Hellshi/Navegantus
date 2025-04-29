import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hospital } from './hospital.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hospital_employees')
export class HospitalEmployee {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  employeeId: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  hospitalId: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.employees)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospital;
}
