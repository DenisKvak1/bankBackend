import {CreateUserDTO} from "../../../../src/core/repository/UserRepository/dto/UserDTO";
import {AccountService} from "../../../../src/core/services/AccountService";
import {DebitService} from "../../../../src/core/services/DebitService";
import {IAccount} from "../../../../src/core/models/AccountModel";

describe('debitService', () => {
    let depitRequestRepository
    let debitService: DebitService
    let accountService
    beforeAll(() => {
        depitRequestRepository = {
            create: jest.fn(),
            getByID: jest.fn((id: number) => {
                if (id === 1) {
                    return {id: 1, cardNumber: 4446820937839595, cardReceiver: 4446820937839590, sum: 100}
                } else if (id === 2) {
                    return {id: 2, cardNumber: 4455820937839595, cardReceiver: 4446820837839590, sum: 200}
                } else if (id === 3) {
                    return {id: 3, cardNumber: 4446830937839395, cardReceiver: 4445820937839590, sum: 300}
                }
            }),
            getAll: jest.fn().mockReturnValue([{
                id: 1,
                cardNumber: 4446820937839595,
                cardReceiver: 4446820937839590,
                sum: 100
            }, {id: 2, cardNumber: 4455820937839595, cardReceiver: 4446820837839590, sum: 200}, {
                id: 3,
                cardNumber: 4446830937839395,
                cardReceiver: 4445820937839590,
                sum: 300
            }]),
            delete: jest.fn()
        }
        accountService = {
            createAccount: jest.fn(),
            removeBalance: jest.fn(),
            addBalance: jest.fn(),
            checkExistence: jest.fn()
        }
    })
    beforeEach(() => {
        // @ts-ignore
        debitService = new DebitService(depitRequestRepository, accountService)
    })
    describe('debitRequest-group', () => {
        test.each([
            [4446820937839595, 4436820937839595, 200],
            [2446820937839595, 3446820937839595, 150],
            [4443820937839595, 4446820337839595, 300]
        ])('debitRequest', (cardNumber, cardReceiver, sum,) => {
            debitService.debitRequest(cardNumber, cardReceiver, sum)

            expect(depitRequestRepository.create).toHaveBeenCalledWith({cardNumber, cardReceiver, sum})
        });
    })
    describe('debitResponse-group', () => {
        test.each([
            [1, false, 4446820937839595, 4446820937839590, 100],
            [2, true, 4455820937839595, 4446820837839590, 200],
            [3, true, 4446830937839395, 4445820937839590, 300]
        ])('debitResponse', (id, accept, cardNumber, cardReceiver, sum) => {
            debitService.debitResponse(id)

            if (accept) {
                expect(accountService.addBalance).toHaveBeenCalledWith(cardReceiver, sum)
                expect(accountService.removeBalance).toHaveBeenCalledWith(cardNumber, sum)
                expect(depitRequestRepository.delete).toHaveBeenCalledWith(id)
            } else {
                expect(accountService.addBalance).not.toHaveBeenCalled()
                expect(accountService.removeBalance).not.toHaveBeenCalled()
                expect(depitRequestRepository.delete).not.toHaveBeenCalled()
            }
        });
    })
})