import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameEncryptedPasswordToPassword1707516734946 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "encrypted_password" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "encrypted_password"`);
    }
}
