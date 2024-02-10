import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEncryptedPasswordToUser1707470430600 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN encrypted_password TEXT NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN encrypted_password
        `);
    }
}
