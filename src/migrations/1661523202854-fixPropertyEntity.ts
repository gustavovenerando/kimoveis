import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPropertyEntity1661523202854 implements MigrationInterface {
    name = 'fixPropertyEntity1661523202854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(2) NOT NULL, "size" integer NOT NULL, "address" text NOT NULL, "sold" boolean NOT NULL DEFAULT false, "categoryId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
