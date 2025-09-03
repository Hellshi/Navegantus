import { Entity, Column, ManyToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('lung_radiology_reports')
export class LungRadiologyReport extends BaseEntity<LungRadiologyReport> {
  @ManyToOne(() => PatientEntity)
  patient: PatientEntity;

  @Column({ type: 'date' })
  reportDate: Date;

  @Column({ type: 'varchar' })
  contourType: 'espiculado' | 'bem definido' | 'outro';

  @Column('float')
  lesionTotalSizeMm: number;

  @Column({ type: 'varchar' })
  lesionLaterality: 'direito' | 'esquerdo' | 'bilateral';

  @Column()
  lungSegment: string;

  @Column()
  multipleLesions: boolean;

  @Column({ type: 'varchar' })
  lesionType: 'sólida' | 'vidro fosco' | 'mista';

  @Column('float')
  solidComponentSizeMm: number;
}
