import {TransferService} from "../../../src/core/services/TransferService";

describe('transfer-service', () => {
    let transferService: TransferService
    let accountService
    let cardService
    let paymentService

    beforeEach(() => {
        accountService = {
            addBalance: jest.fn(),
            removeBalance: jest.fn(),
            createAccount: jest.fn(),
            checkExistence: jest.fn()
        }
        cardService = {
            checkExistence(number: number): boolean {
                if (number === 4016597554068212) {
                    return true
                } else if (number === 4176731035009851) {
                    return false
                } else if (number === 4230631771497662) {
                    return true
                }
            }, createCard(accountID: number) {
                return 'createTest'
            }, getByNumber(number: number) {
                if (number === 4016597554068212) {
                    return {id: 1, account: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                } else if (number === 4176731035009851) {
                    return {id: 2, account: {id: 2, owner: {id: 1, email: 'string3', password: 'string3', name: 'name2'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                } else if (number === 4230631771497662) {
                    return {id: 3, account: {id: 3, owner: {id: 1, email: 'string2', password: 'string3', name: 'name4'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                }
            }

        }
        paymentService = {
            create: jest.fn(),
            deletePayment: jest.fn(),
            getByID: jest.fn((id: number) => {
                if (id === 1) {
                    return {id: 1,
                        from: {
                            id: 1,
                            owner: {id: 1, email: 'string1', password: 'string', name: 'name1'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        to: {
                            id: 1,
                            owner: {id: 1, email: 'string1', password: 'string', name: 'name'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        sum: 100
                    }
                } else if (id === 2) {
                    return {id: 2,
                        from: {
                            id: 2,
                            owner: {id: 2, email: 'string2', password: 'string', name: 'name2'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        to: {
                            id: 1,
                            owner: {id: 1, email: 'string2', password: 'string', name: 'name'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        sum: 200
                    }
                } else if (id === 3) {
                    return {id: 3,
                        from: {
                            id: 3,
                            owner: {id: 3, email: 'string3', password: 'string', name: 'name3'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        to: {
                            id: 1,
                            owner: {id: 1, email: 'string3', password: 'string', name: 'name'},
                            balance: 100,
                            publicID: 'e09xssada424-a317-ffa69cfa8a69'
                        },
                        sum: 300
                    }
                }
            }),
            getAllPayments: jest.fn()
        }
        transferService = new TransferService(accountService, cardService, paymentService)
    })
    describe('transfer-group', () => {
        test.each([
            [1, 2, 100],
            [2, 1, 100],
            [3, 1, 400],
            [1, 3, 100]
        ])('transfer', (id1, id2, sum) => {
            transferService.transfer(id1, id2, sum)

            expect(accountService.removeBalance).toHaveBeenCalledWith(id1, sum)
            expect(accountService.addBalance).toHaveBeenCalledWith(id2, sum)
            expect(paymentService.create).toHaveBeenCalledWith({from: id1, to: id2, sum: sum})
        });
    })
    describe('transferOnCard-group', ()=>{
        test.each([
            [4016597554068212, 4176731035009851, 100, {id: 1, account: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 150, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}, {id: 2, account: {id: 2, owner: {id: 2, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}],
            [4176731035009851, 4230631771497662, 200, {id: 2, account: {id: 2, owner: {id: 2, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}, {id: 3, account: {id: 3, owner: {id: 3, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 403597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}],
            [4230631771497662, 4016597554068212, 400, {id: 3, account: {id: 3, owner: {id: 3, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 403597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}, {id: 1, account: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 150, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}],
        ])('transfer', (number, number2, sum, card, card2) => {
            transferService.transferOnCard(number, number2, sum)

            expect(accountService.removeBalance).toHaveBeenCalledWith(card.account.id, sum)
            expect(accountService.addBalance).toHaveBeenCalledWith(card2.account.id, sum)
            expect(paymentService.create).toHaveBeenCalledWith({from: card.account.id, to: card2.account.id, sum: sum})
        });
    })
    describe('cancelTransfer-group', () => {
        test.each([
            [1, {id: 1,
                from: {
                    id: 1,
                    owner: {id: 1, email: 'string1', password: 'string', name: 'name1'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                to: {
                    id: 1,
                    owner: {id: 1, email: 'string1', password: 'string', name: 'name'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                sum: 100
            }],
            [2, {id: 2,
                from: {
                    id: 2,
                    owner: {id: 2, email: 'string2', password: 'string', name: 'name2'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                to: {
                    id: 1,
                    owner: {id: 1, email: 'string2', password: 'string', name: 'name'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                sum: 200
            }],
            [3, {id: 3,
                from: {
                    id: 3,
                    owner: {id: 3, email: 'string3', password: 'string', name: 'name3'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                to: {
                    id: 1,
                    owner: {id: 1, email: 'string3', password: 'string', name: 'name'},
                    balance: 100,
                    publicID: 'e09xssada424-a317-ffa69cfa8a69'
                },
                sum: 300
            }]
        ])('cancelTransfer', (id, payment) => {
            transferService.cancelTransfer(id)

            expect(paymentService.deletePayment).toHaveBeenCalledWith(id)
            expect(accountService.addBalance).toHaveBeenCalledWith(payment.from.id, payment.sum)
            expect(accountService.removeBalance).toHaveBeenCalledWith(payment.to.id, payment.sum)
        });
    })
})