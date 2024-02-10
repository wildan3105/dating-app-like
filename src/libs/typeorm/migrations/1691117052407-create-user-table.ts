import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1691117052407 implements MigrationInterface {
    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TABLE "user" (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL default now(),
            updated_at TIMESTAMP default now()
        )`);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
