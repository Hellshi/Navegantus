import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IhcMarkerDto {
  @ApiProperty({ example: 'TTF-1' })
  @IsString()
  markerName: string;

  @ApiProperty({ enum: ['positivo', 'negativo', 'indeterminado'] })
  @IsEnum(['positivo', 'negativo', 'indeterminado'])
  result: 'positivo' | 'negativo' | 'indeterminado';
}

export class RecommendationDto {
  @ApiProperty({ example: 'Solicitar PET-CT' })
  @IsString()
  recommendation: string;
}

export class CreatePathologicalReportDto {
  @ApiProperty({ example: 'Biópsia pulmonar por broncoscopia' })
  @IsString()
  procedure: string;

  @ApiProperty({ example: 'Fragmentos de tecido pardo-acastanhado...' })
  @IsString()
  macroscopy: string;

  @ApiProperty({ example: 'Presença de células epiteliais atípicas...' })
  @IsString()
  microscopy: string;

  @ApiProperty({ example: 'Adenocarcinoma pulmonar' })
  @IsString()
  diagnosisType: string;

  @ApiProperty({ example: 'Moderadamente diferenciado' })
  @IsString()
  diagnosisGrade: string;

  @ApiProperty({
    type: [IhcMarkerDto],
    example: [
      { markerName: 'TTF-1', result: 'positivo' },
      { markerName: 'p40', result: 'negativo' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IhcMarkerDto)
  ihcMarkers: IhcMarkerDto[];

  @ApiProperty({
    type: [RecommendationDto],
    example: [
      { recommendation: 'Solicitar PET-CT' },
      { recommendation: 'Avaliar mutações EGFR/ALK' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecommendationDto)
  recommendations: RecommendationDto[];
}
