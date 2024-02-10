import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserRepository } from '../libs/typeorm/repository/user';
import { UserVerificationCodeRepository } from '../libs/typeorm/repository/user-verification-code';  
import { ErrorCodes } from '../domain/errors';
import { StandardError } from '../domain/standard-error';
import { IUserCreateRequest, IUserCreateResponse, IUserLoginRequest, IUserLoginResponse, IUserDetailsResponse } from '../interfaces/user';
import { TOKEN_SECRET_KEY } from '../config';
import events  from '../events';

const SEVEN_DAY_IN_MILIS = 7 * 24 * 60 * 60 * 1000;
const CODE_LENGTH = 255;
const SALT_ROUNDS = 13;
const TOKEN_LIFETIME_IN_SECONDS = 86400 // 24 hours

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly userVerificationCodeRepo: UserVerificationCodeRepository;

    constructor(userRepo: UserRepository, userVerificationCodeRepo: UserVerificationCodeRepository) {
        this.userRepo = userRepo;
        this.userVerificationCodeRepo = userVerificationCodeRepo;
    }

    async create(user: IUserCreateRequest): Promise<IUserCreateResponse> {
        const filter = {
            email: user.email,
            is_active: true
        };

        const existingActiveUser = await this.userRepo.findOneByFilter(filter);

        if (existingActiveUser) {
            throw new StandardError(ErrorCodes.UNPROCESSABLE, `User with email: ${filter.email} is already registered.`)
        }

        if (!this.isValidCode(user.password)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Password must contain at least 1 number, 1 uppercase letter and 1 lowercase letter.')
        }

        user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);

        const createdUser = await this.userRepo.save(user);

        const expiredAt = new Date(Date.now() + SEVEN_DAY_IN_MILIS);
        const code = this.generateRandomCode();
        const verificationCodeData = {
            expired_at: expiredAt,
            code,
            user_id: createdUser.id
        }

        await this.userVerificationCodeRepo.createVerificationCode(verificationCodeData, createdUser)

        if (createdUser) {
            events.emit('new_user', createdUser, verificationCodeData.code);
        }

        const userCreationResponse: IUserCreateResponse = {
            id: createdUser.id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            created_at: createdUser.created_at
        };

        return userCreationResponse;
    }

    async verify(code: string): Promise<boolean | Error> {
        if (code.length !== CODE_LENGTH || !this.isValidCode(code)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Code is invalid. Please check your verification code.')
        }

        const verificationCode = await this.userVerificationCodeRepo.findOneByCode(code);
        if (!verificationCode) {
            throw new StandardError(ErrorCodes.USER_NOT_FOUND, 'Code is not found');
        }

        const now = new Date();
        if (now > verificationCode.expired_at) {
            throw new StandardError(ErrorCodes.CODE_EXPIRED, 'Code is already expired');
        }

        if (verificationCode.user.is_active) {
            throw new StandardError(ErrorCodes.CONFLICT, 'User is already active');
        }

        const updatedUser = await this.userRepo.updateUserToActive(verificationCode.user.id);

        if (!updatedUser) {
            throw new StandardError(ErrorCodes.USER_NOT_FOUND, 'User is not found');
        }

        return true;
    }

    async login(user: IUserLoginRequest): Promise<IUserLoginResponse> {
        const filter = {
            email: user.email,
            is_active: true
        };

        const userFoundAndActive = await this.userRepo.findOneByFilter(filter);
        if (!userFoundAndActive) {
            throw new StandardError(ErrorCodes.USER_NOT_FOUND, 'User is not found or inactive.')
        }

        const isPasswordCorrect = bcrypt.compareSync(user.password, userFoundAndActive.password);
        if (!isPasswordCorrect) {
            throw new StandardError(ErrorCodes.UNAUTHORIZED, 'Password is invalid.')
        }

        const token = jwt.sign({ id: userFoundAndActive.id }, TOKEN_SECRET_KEY as string, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: TOKEN_LIFETIME_IN_SECONDS
        });

        return {
            id: userFoundAndActive.id,
            first_name: userFoundAndActive.first_name,
            last_name: userFoundAndActive.last_name,
            email: userFoundAndActive.email,
            access_token: token
        }
    }

    async logout(id: string): Promise<void> {
        const now = new Date(); 
        await this.userRepo.updateLastLogoutAt(id, now);

        // TODO: future improvement by adding token to the 'blacklisted_token' so that we can validate during the login
        // for now, I'll just emit an event to indicate certain user is performing log out
        events.emit('user_logout', { user_id: id });
    }

    async getUserDetails(userId: string): Promise<IUserDetailsResponse> {
        const userDetails = await this.userRepo.findOneByFilter({ id: userId });
        if (!userDetails) {
            throw new StandardError(ErrorCodes.USER_NOT_FOUND, 'User not found');
        }

        const response = {
            id: userDetails.id,
            email: userDetails.email,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name
        };

        return response;
    }


    // TODO: rename and move out to utils
    private isValidCode(code: string): boolean {
        return /[a-z]/.test(code) && /[A-Z]/.test(code) && /\d/.test(code);
    }

    private generateRandomCode(): string {
        const length = CODE_LENGTH;
        const charactersRegex = /[a-zA-Z0-9]/g;
    
        return Array.from({ length }, () => {
            let randomChar;
            do {
                const charCode = Math.floor(Math.random() * 62);
                randomChar = String.fromCharCode(charCode < 26 ? charCode + 97 : charCode < 52 ? charCode + 39 : charCode - 4);
            } while (!randomChar.match(charactersRegex));
    
            return randomChar;
        }).join('');
    }    

}