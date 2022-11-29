import { MigrationInterface, QueryRunner } from "typeorm";

export class padrao1667021650567 implements MigrationInterface {
    name = 'padrao1667021650567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "usuario" character varying NOT NULL, "senha" character varying NOT NULL, "idade" integer NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
