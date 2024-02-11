import { DataSource, Repository } from 'typeorm';
import { UserLogin } from '../../../domain/user-login-entity';
import { User } from '../../../domain/user-entity';
import { IUserLoginRequest, IUserLoginResponse } from '../../../interfaces/user-login';

export class UserLoginRepository extends Repository<UserLogin> {
    constructor(dataSource: DataSource) {
        super(UserLogin, dataSource.createEntityManager());
    }

    async createUserLogin(userLoginData: IUserLoginRequest, user: User): Promise<IUserLoginResponse> {
        const newUserLogin = new UserLogin();

        newUserLogin.login_timestamp = userLoginData.login_timetamp;
        newUserLogin.user = user;

        const createdVerificationCode = await this.save(newUserLogin);

        return createdVerificationCode;
    }
}
