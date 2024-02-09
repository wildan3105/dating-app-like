export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
}

export interface IUserVerificationRequest {
    code: string;
}

export interface IUserWithVerificationCode {
    id: string;
    codes: IVerificationCodes[]
}

interface IVerificationCodes {
    id: string;
    code: string;
    created_at: Date;
    expired_at: Date;
}