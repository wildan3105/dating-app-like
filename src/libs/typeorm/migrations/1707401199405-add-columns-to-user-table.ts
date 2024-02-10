import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndDeletedAtToUser1707401199405 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the "email" column
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN email TEXT NOT NULL`);

        // Add the "deleted_at" column
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN deleted_at TIMESTAMP DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the "email" column
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN email`);

        // Remove the "deleted_at" column
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN deleted_at`);
    }
}
