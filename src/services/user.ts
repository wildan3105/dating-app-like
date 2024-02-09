import { User } from '../domain/user-entity';
import { UserRepository } from '../libs/typeorm/repository/user';
import { UserVerificationCodeRepository } from '../libs/typeorm/repository/user-verification-code';  
import { ErrorCodes } from '../domain/errors';
import { StandardError } from '../domain/standard-error';

const SEVEN_DAY_IN_MILIS = 7 * 24 * 60 * 60 * 1000;
const CODE_LENGTH = 255;

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly userVerificationCodeRepo: UserVerificationCodeRepository;

    constructor(userRepo: UserRepository, userVerificationCodeRepo: UserVerificationCodeRepository) {
        this.userRepo = userRepo;
        this.userVerificationCodeRepo = userVerificationCodeRepo;
    }

    async create(user: User): Promise<User> {
        const filter = {
            email: user.email,
            is_active: true
        };

        const existingActiveUser = await this.userRepo.findOneByFilter(filter);

        if (existingActiveUser) {
            throw new StandardError(ErrorCodes.UNPROCESSABLE, `User with email: ${filter.email} is already registered.`)
        }

        const createdUser = await this.userRepo.save(user);

        const expiredAt = new Date(Date.now() + SEVEN_DAY_IN_MILIS);
        const code = this.generateRandomCode();
        const verificationCodeData = {
            expired_at: expiredAt,
            code,
            user_id: createdUser.id
        }

        await this.userVerificationCodeRepo.createVerificationCode(verificationCodeData, createdUser)

        return createdUser;
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

    // TODO: move out to utilities
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