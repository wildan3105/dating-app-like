import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveAndUniqueEmail1707403380904 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the is_active column
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN is_active BOOLEAN DEFAULT false`);

        // Add a unique constraint to the email column for active users
        await queryRunner.query(`CREATE UNIQUE INDEX idx_unique_email ON "user" (email) WHERE is_active = true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the unique constraint
        await queryRunner.query(`DROP INDEX idx_unique_email`);

        // Remove the is_active column (if needed)
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN is_active`);
    }
}
