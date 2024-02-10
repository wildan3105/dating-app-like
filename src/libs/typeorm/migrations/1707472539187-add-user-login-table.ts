import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserLoginTable1707472539187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "user_login" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        login_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_id UUID REFERENCES "user" (id) ON DELETE CASCADE
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_login"`);
    }
}
