import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEmailColumnType1707401600832 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Change the column type to VARCHAR(255)
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN email TYPE VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the column type back to TEXT
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN email TYPE TEXT`);
    }
}
