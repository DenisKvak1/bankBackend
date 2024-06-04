import {CreateUserDTO} from "../../repository/UserRepository/dto/UserDTO";
import {IUser} from "../../models/UserModel";
import {IAccount} from "../../models/AccountModel";
import {IPayment} from "../../models/PaymentModel";
import {CreatePaymentDTO} from "../../repository/PaymentRepository/dto/paymentDTO";
import {ICard} from "../../models/CardModel";
import {IATM} from "../../models/ATMModel";
import { IDebitRequest } from '../../models/DebitRequestModel';

export type IUserService = {
    register(registerData: CreateUserDTO): Promise<IUser>;
    getUser(email: string): Promise<IUser> | undefined;
    deleteUser(id: number): void;
    setPassword(id: number, password: string): void;
    setName(id: number, name: string): void;
    checkPassword(email: string, password: string): Promise<boolean>;
    checkExistence(id: number): boolean;
    checkExistenceByEmail(email: string): Promise<boolean>
}

export type IAccountService = {
    createAccount(ownerId: number): Promise<IAccount>;
    removeBalance(id: number, sum: number): void;
    addBalance(id: number, sum: number): void;
    checkExistence(id: number): boolean;
}

export type IPaymentService = {
    create(paymentData: CreatePaymentDTO): Promise<IPayment>;
    getByID(paymentId: number): Promise<IPayment> | undefined;
    getAllPayments(accountId: number): Promise<IPayment[]>;
    deletePayment(paymentId: number): void;
}

export type ITransferService = {
    transfer(destinationId: number, receiverId: number, sum: number): void
    transferOnCard(destinationNumber: number, receiverNumber: number, sum: number): Promise<void>
    cancelTransfer(paymentId: number): void
}

export type ICardService = {
    createCard(accountID: number, dateExpired: string): Promise<ICard>
    deleteCard(number: number): void
    getByNumber(number: number): Promise<ICard>
    checkExistence(number: number): Promise<boolean>
    checkOwner(id: number, number: number): Promise<boolean>
    checkCorrectCardData(number: number, cvv2: number, date: string): Promise<boolean>
    checkExpire(number: number): Promise<boolean>
}

export type IDebitService = {
    debitRequest(cardNumber: number, cardReceiver: number, sum: number): Promise<IDebitRequest>
    debitResponse(token: number, accept: boolean): void
    getDebitRequest(id:number): Promise<IDebitRequest | undefined>
}

export type IATMService = {
    createATM(): Promise<IATM>
    getATMByID(id: number): Promise<IATM | undefined>
    replenishmentAccount(id: number, replenishmentID: number, sum: number): void
    replenishmentCard(id: number, cardNumber: number, sum: number): void
}