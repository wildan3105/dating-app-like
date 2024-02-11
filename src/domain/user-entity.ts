import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IUser } from '../interfaces/user';
import { UserVerificationCode } from './user-verification-code-entity';
import { UserLogin } from './user-login-entity';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    first_name: string;

    @Column({ type: 'text' })
    last_name: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'boolean', default: false })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @DeleteDateColumn()
    last_logout_at: Date;

    @OneToMany(() => UserVerificationCode, (code) => code.user)
    verificationCodes: UserVerificationCode[];

    @OneToMany(() => UserLogin, (login) => login.user)
    logins: UserLogin[];
}
