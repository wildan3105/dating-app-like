import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserLogin } from '../interfaces/user-login';
import { User } from './user-entity';

@Entity()
export class UserLogin implements IUserLogin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    login_timestamp: Date;

    @Column({ type: 'varchar', length: 45, nullable: true })
    ip_address: string;

    @ManyToOne(() => User, (user) => user.logins)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
