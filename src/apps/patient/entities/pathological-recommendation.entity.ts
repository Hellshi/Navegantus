import { Entity, Column, ManyToOne } from 'typeorm';
import { PathologicalReport } from './pathological-report.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('pathological_recommendations')
export class PathologicalRecommendation extends BaseEntity<PathologicalRecommendation> {
  @ManyToOne(() => PathologicalReport, (report) => report.recommendations, {
    onDelete: 'CASCADE',
  })
  report: PathologicalReport;

  @Column({ type: 'text' })
  recommendation: string;
}
