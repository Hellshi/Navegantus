import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/repository/base-repository";
import { HospitalEmployee } from "../entities/hospital-employee.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class HospitalEmployeeRepository extends BaseRepository<HospitalEmployee> {
    constructor(
        @InjectRepository(HospitalEmployee)
        private repository: BaseRepository<HospitalEmployee>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}