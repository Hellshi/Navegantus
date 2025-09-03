import { Entity, Column, ManyToOne } from 'typeorm';
import { LungPathologyReport } from './lung-pathology-report.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('lung_pathology_molecular_tests')
export class LungPathologyMolecularTest extends BaseEntity<LungPathologyMolecularTest> {
  @ManyToOne(() => LungPathologyReport, (report) => report.molecularTests)
  report: LungPathologyReport;

  @Column()
  technique: string;

  @Column()
  //Os Biomarcadores devem ser campos livres? Ou têm uma lista?
  /* Um campo multi-select mas temos que conversar com Diego para definir isso*/
  biomarker: string;

  @Column()
  mutationType: string;

  @Column()
  isVus: boolean;

  @Column()
  hasTargetedDrug: boolean;
}
