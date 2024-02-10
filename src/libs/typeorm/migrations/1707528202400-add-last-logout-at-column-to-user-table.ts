import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastLogoutAtToUser1707528202400 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN last_logout_at TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN last_logout_at
        `);
    }
}
