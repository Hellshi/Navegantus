import { Entity, Column, ManyToOne } from 'typeorm';
import { PathologicalReport } from './pathological-report.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

export enum IhcResult {
  POSITIVO = 'positivo',
  NEGATIVO = 'negativo',
  INDETERMINADO = 'indeterminado',
}

@Entity('pathological_ihc_markers')
export class PathologicalIhcMarker extends BaseEntity<PathologicalIhcMarker> {
  @ManyToOne(() => PathologicalReport, (report) => report.ihcMarkers, {
    onDelete: 'CASCADE',
  })
  report: PathologicalReport;

  @Column({ type: 'varchar' })
  markerName: string;

  @Column({ type: 'enum', enum: IhcResult })
  result: IhcResult;
}
