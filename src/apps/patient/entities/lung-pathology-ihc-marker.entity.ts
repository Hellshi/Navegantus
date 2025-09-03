import { Entity, Column, ManyToOne } from 'typeorm';
import { LungPathologyReport } from './lung-pathology-report.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('lung_pathology_ihc_markers')
export class LungPathologyIhcMarker extends BaseEntity<LungPathologyIhcMarker> {
  @ManyToOne(() => LungPathologyReport, (report) => report.ihcMarkers)
  report: LungPathologyReport;

  @Column()
  markerName: string;

  @Column()
  result: string;
}
