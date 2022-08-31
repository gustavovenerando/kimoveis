import { MigrationInterface, QueryRunner } from "typeorm";

export class propertyCategoryRelation1661537722221 implements MigrationInterface {
    name = 'propertyCategoryRelation1661537722221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryId" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryIdId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryIdId" TO "categoryId"`);
    }

}
