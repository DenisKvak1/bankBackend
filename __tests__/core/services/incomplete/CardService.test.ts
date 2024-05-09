import {PaymentService} from "../../../../src/core/services/PaymentService";
import {CardService} from "../../../../src/core/services/CardService";
import {ICardService} from "../../../../src/core/services/interface/types";

describe('paymentService', () => {
    let cardRepository
    let cardService: ICardService

    beforeAll(() => {
        cardRepository = {
            create: jest.fn(()=>{
                return 'testCreateCard'
            }),
            getByNumber: jest.fn((number: number)=>{
                if (number === 4016597554068212) {
                    return {id: 1, account: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                } else if (number === 4176731035009851) {
                    return {id: 2, account: {id: 2, owner: {id: 1, email: 'string3', password: 'string3', name: 'name2'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                } else if (number === 4230631771497662) {
                    return {id: 3, account: {id: 3, owner: {id: 1, email: 'string2', password: 'string3', name: 'name4'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}
                }
            }),
            delete: jest.fn(),
            deleteByNumber: jest.fn(),
            getAll: jest.fn(()=> []),
            update: jest.fn()
        }
    })
    beforeEach(() => {
        cardService = new CardService(cardRepository as any)
    })

    describe('createCard-group', ()=>{
        test.each([
            [1, 'testCreateCard'],
            [2, 'testCreateCard'],
            [3, 'testCreateCard'],
            [4, 'testCreateCard'],
            [5, 'testCreateCard'],
        ])('createCard', (id, expected) => {
            // @ts-ignore
            const returnedValue = cardService.createCard(id)

            expect(cardRepository.create).toHaveBeenCalledWith(expect.objectContaining({account_id: id}));
            expect(returnedValue).toEqual(expected);
        });
    })
    describe('deleteCard-group', ()=>{
        test.each([1222, 234143, 45673, 8786787684, 8768785])('deleteCard', (id) => {
            cardService.deleteCard(id)

            expect(cardRepository.deleteByNumber).toHaveBeenCalledWith(id);
        });
    })
    describe('getByNumber-group', ()=>{
        test.each([
            [4016597554068212, {id: 1, account: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}],
            [4176731035009851, {id: 2, account: {id: 2, owner: {id: 1, email: 'string3', password: 'string3', name: 'name2'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}],
            [4230631771497662, {id: 3, account: {id: 3, owner: {id: 1, email: 'string2', password: 'string3', name: 'name4'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, number: 4016597554068212, ccv2: 111, dateExpired: '2024-04-30 09:19:24.037677'}]
        ])('getByNumber', (number, card) => {
            const returnValue  = cardService.getByNumber(number)

            expect(returnValue).toEqual(card)
        });
    })
    describe('checkExistence-group', ()=>{
        test.each([
            [4016597554068212, true],
            [4176731035009851, true],
            [4230631771497662, true],
            [4530631771497662, false],
            [7330631571497662, false]
        ])('checkExistence', (id , expected) => {
            const returnValue = cardService.checkExistence(id)

            expect(returnValue).toBe(expected);
        });
    })

})