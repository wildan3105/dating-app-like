import { CreateUserTable1691117052407 } from './1691117052407-create-user-table';
import { AddEmailAndDeletedAtToUser1707401199405 } from './1707401199405-add-columns-to-user-table';
import { ChangeEmailColumnType1707401600832 } from './1707401600832-alter-email-type';
import { AddIsActiveAndUniqueEmail1707403380904 } from './1707403380904-add-email-unique-constraint-and-is-active-column';
import { CreateUserVerificationCodeTable1707441732146 } from './1707441732146-create-user-verification-code-table';

export const migrations = [
    CreateUserTable1691117052407,
    AddEmailAndDeletedAtToUser1707401199405,
    ChangeEmailColumnType1707401600832,
    AddIsActiveAndUniqueEmail1707403380904,
    CreateUserVerificationCodeTable1707441732146
];
