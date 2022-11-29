import { MigrationInterface, QueryRunner } from "typeorm";

export class padrao1667108379590 implements MigrationInterface {
    name = 'padrao1667108379590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "status" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
