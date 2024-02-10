import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRedundantForeignKeyConstraint1707606998675 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_login" 
            DROP CONSTRAINT "user_login_user_id_fkey"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_login" 
            ADD CONSTRAINT "user_login_user_id_fkey" 
            FOREIGN KEY ("user_id") 
            REFERENCES "user"("id") 
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
    }
}
