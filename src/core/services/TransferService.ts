import {IAccountService, ICardService, IPaymentService, ITransferService} from "./interface/types";
import {accountService} from "./AccountService";
import {cardService} from "./CardService";
import {paymentService} from "./PaymentService";

export class TransferService implements ITransferService {
    private accountService: IAccountService
    private cardService: ICardService
    private paymentService: IPaymentService

    constructor(accountService: IAccountService, cardService: ICardService, paymentService: IPaymentService) {
        this.accountService = accountService
        this.cardService = cardService
        this.paymentService = paymentService
    }

    async transferOnCard(destinationNumber: number, receiverNumber: number, sum: number): Promise<void> {
        const destination = await this.cardService.getByNumber(destinationNumber)
        const receiver = await this.cardService.getByNumber(receiverNumber)

        await this.transfer(destination.account.id, receiver.account.id, sum)
    }

    async transfer(destinationId: number, receiverId: number, sum: number): Promise<void> {
        this.accountService.removeBalance(destinationId, sum)
        this.accountService.addBalance(receiverId, sum)
        await this.paymentService.create({from: destinationId, to: receiverId, sum: sum})
    }

    async cancelTransfer(paymentId: number): Promise<void> {
        const payment = await  this.paymentService.getByID(paymentId)
        this.paymentService.deletePayment(paymentId)
        this.accountService.addBalance(payment.from.id, payment.sum)
        this.accountService.removeBalance(payment.to.id, payment.sum)
    }
}
export const transferService = new TransferService(accountService, cardService, paymentService)