import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

/* 
    Anotações Home page:
    SUbtipo, mutação, dado de sez=xo de usuário, localização  (alterar o mapa mundi para um de de AL)
    15 nums do cns
    Checar api do correios para buscar cidades a partir do estado selecionado E/OU por cep
*/

import { PatientEntity } from './patient.entity';
import { LungPathologyIhcMarker } from './lung-pathology-ihc-marker.entity';
import { LungPathologyMolecularTest } from './lung-pathology-molecular-test.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('lung_pathology_reports')
export class LungPathologyReport extends BaseEntity<LungPathologyReport> {
  @ManyToOne(() => PatientEntity)
  patient: PatientEntity;

  @Column({ type: 'enum', enum: ['biópsia', 'peça cirúrgica'] })
  reportType: 'biópsia' | 'peça cirúrgica';

  @Column()
  //Quais são os tipos esperados aqui?
  /*  */
  mainHistologicType: string;

  @Column('float')
  mainHistologicPercentage: number;

  @Column('text')
  //Quais são os tipos esperados aqui?
  /* Ele vai ser um multi-select a ser definido depois. OBS: Att isso para um many to many */
  secondaryHistologicTypes: string;

  @Column('float')
  invasiveComponentSizeMm: number;

  @Column()
  perineuralInfiltration: boolean;

  @Column('int')
  peritumoralInflammationScore: number;

  @Column()
  presenceOfStas: boolean;

  @Column()
  nucleusCytoplasmRatio: string;

  @Column()
  pleuralInvasion: boolean;

  @Column('int')
  lymphNodesInvolved: number;

  @Column('text')
  marginsDescription: string;

  @Column()
  histologicGrade: string;

  @Column('int')
  mitosisCount: number;

  @Column('text')
  otherChanges: string;

  @Column()
  insuranceType: string;

  @Column()
  pdfReportUrl: string;

  @Column({ type: 'timestamp' })
  releasedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => LungPathologyIhcMarker, (marker) => marker.report)
  ihcMarkers: LungPathologyIhcMarker[];

  @OneToMany(() => LungPathologyMolecularTest, (test) => test.report)
  molecularTests: LungPathologyMolecularTest[];
}
