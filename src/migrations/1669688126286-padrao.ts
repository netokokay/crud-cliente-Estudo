import { MigrationInterface, QueryRunner } from "typeorm";

export class padrao1669688126286 implements MigrationInterface {
    name = 'padrao1669688126286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "usuario"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "usuario" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "UQ_ac5ff5d9db3012704b7f4ddfbb2" UNIQUE ("usuario")`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "senha" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "UQ_ac5ff5d9db3012704b7f4ddfbb2"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "usuario"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "usuario" character varying NOT NULL`);
    }

}
