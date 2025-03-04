import { Role } from "src/apps/role/entities/role.entity";
import { RoleName } from "src/apps/role/enum/roles.enum";
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddRoles1741128242024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const roles = [
              {
                name: RoleName.DIRECTOR,
                description: 'Diretor do Hospital',
                displayName: 'Diretor',
              },
              {
                name: RoleName.HEALTH_STAFF,
                description: 'Funcionário do Hospital não relacionado à medicina ou enfermagem',
                displayName: 'Funcionário',
              },
              {
                name: RoleName.MASTER,
                description: 'Usuário master do sistema para gerenciamento de diretores e hospitais',
                displayName: 'Master',
              },
              {
                name: RoleName.NAVIGATOR,
                description: 'Navegador do Hospital',
                displayName: 'Navegante',
              },
              {
                name: RoleName.STAFF,
                description: 'Funcionário do Hospital relacionado à enfermagem ou medicina',
                displayName: 'Enfermeiro/Médico',
              },
            ];
      
            const roleMap = roles.map((role) => new Role(role));
      
            await queryRunner.manager.getRepository(Role).save(roleMap);
          } catch (err) {
            console.error(err);
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "role" RESTART IDENTITY CASCADE;`);
    }

}
