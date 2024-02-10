import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user-entity';

@Entity()
export class UserLogin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    login_timestamp: Date;

    @Column({ type: 'varchar', length: 45, nullable: true })
    ip_address: string;

    @ManyToOne(() => User, (user) => user.logins)
    user: User;
}
