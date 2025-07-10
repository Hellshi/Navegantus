import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { PathologicalIhcMarker } from './pathological-ihc-marker.entity';
import { PathologicalRecommendation } from './pathological-recommendation.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('pathological_reports')
export class PathologicalReport extends BaseEntity<PathologicalReport> {
  @ManyToOne(() => PatientEntity, (patient) => patient.pathologicalReports, {
    nullable: false,
  })
  patient?: PatientEntity;

  @Column({ type: 'varchar' })
  procedure: string;

  @Column({ type: 'text' })
  macroscopy: string;

  @Column({ type: 'text' })
  microscopy: string;

  @Column({ type: 'varchar' })
  diagnosisType: string;

  @Column({ type: 'varchar' })
  diagnosisGrade: string;

  @OneToMany(() => PathologicalIhcMarker, (marker) => marker.report, {
    cascade: true,
  })
  ihcMarkers?: PathologicalIhcMarker[];

  @OneToMany(() => PathologicalRecommendation, (rec) => rec.report, {
    cascade: true,
  })
  recommendations?: PathologicalRecommendation[];
}
