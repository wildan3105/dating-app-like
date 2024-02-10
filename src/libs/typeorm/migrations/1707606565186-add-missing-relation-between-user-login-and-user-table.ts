import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenUserLoginAndUser1707606565186 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_login" 
            ADD CONSTRAINT "FK_user_login_user" 
            FOREIGN KEY ("user_id") 
            REFERENCES "user"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_login" 
            DROP CONSTRAINT "FK_user_login_user"
        `);
    }
}
