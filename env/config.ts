import {SQLAccountRepository} from "../src/infrastructure/db/repository/AccountRepository";
import {PostgreSQL} from "../src/infrastructure/db/PostgreSQL/PostgreSQL";
import {SQLUserRepository} from "../src/infrastructure/db/repository/UserRepository";
import {SQLCardRepository} from "../src/infrastructure/db/repository/CardRepository";
import {SQLDebitRequestRepository} from "../src/infrastructure/db/repository/DebitRequestRepository";
import {SQLPaymentRepository} from "../src/infrastructure/db/repository/PaymentRepository";
import {SQLATMRepository} from "../src/infrastructure/db/repository/ATMRepository";
import {JWTUserAuthorizationService} from "../src/infrastructure/services/AuthorizationService/JWTUserAuthorizationService";


export const SQLDataBase = new PostgreSQL()
export const repositories = {
    userRepository: new SQLUserRepository(SQLDataBase),
    accountRepository: new SQLAccountRepository(SQLDataBase),
    cardRepository: new SQLCardRepository(SQLDataBase),
    paymentRepository: new SQLPaymentRepository(SQLDataBase),
    debitRequestRepository: new SQLDebitRequestRepository(SQLDataBase),
    ATMRepository: new SQLATMRepository(SQLDataBase)
}
export enum appConfig {
    userVerificationCode = 'tZ8Ct93mMbhJLzY8h2973PL5iMi5vR',
    ATMKey = 'V6t87e2nd2bt49UA354LiKs7McCuMJRa'
}
export const userAuthService = new JWTUserAuthorizationService(appConfig.userVerificationCode)
