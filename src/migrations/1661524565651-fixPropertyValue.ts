import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPropertyValue1661524565651 implements MigrationInterface {
    name = 'fixPropertyValue1661524565651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "value" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "value" TYPE numeric`);
    }

}
