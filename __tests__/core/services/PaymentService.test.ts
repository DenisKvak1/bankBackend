import {CreatePaymentDTO} from "../../../src/core/repository/PaymentRepository/dto/paymentDTO";
import {PaymentService} from "../../../src/core/services/PaymentService";

describe('paymentService', () => {
    let paymentRepository
    let paymentService

    beforeAll(() => {
        paymentRepository = {
            create: jest.fn((data: CreatePaymentDTO) => {
                return 'test Value'
            }),
            getByID: jest.fn((id: number) => {
                if(id === 1){
                    return {id: 1, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}
                } else if(id === 2){
                    return {id: 2, from: {id: 2, owner: {id: 2, email: 'string2', password: 'string', name: 'name2'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string2', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 200}
                } else if(id === 3){
                    return {id: 3, from: {id: 3, owner: {id: 3, email: 'string3', password: 'string', name: 'name3'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string3', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 300}
                }
            }),
            getAllByID: jest.fn((id: number)=>{
                if(id === 1){
                    return [{id: 2, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]
                } else if(id === 2){
                    return [{id: 4, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]
                } else if(id === 3){
                    return [{id: 8, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]
                }
            }),
            getAll: jest.fn(()=>{
                return [{id: 2, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]
            }),
            delete: jest.fn()
        }
    })
    beforeEach(() => {
        paymentService = new PaymentService(paymentRepository as any)
    })

    describe('create-group', ()=>{
        test.each([
            [{id: 1, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, 'test Value'],
            [{id: 2, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 300}, 'test Value'],
            [{id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 500}, 'test Value'],
        ])('create', (data, expected) => {
            const returnedValue = paymentService.create(data)

            expect(paymentRepository.create).toHaveBeenCalledWith(data);
            expect(returnedValue).toEqual(expected);
        });
    })
    describe('delete-group', ()=>{
        test.each([1, 2, 3, 4, 5])('delete', (id) => {
            paymentService.deletePayment(id)

            expect(paymentRepository.delete).toHaveBeenCalledWith(id);
        });
    })
    describe('getByID-group', ()=>{
        test.each([
            [1, {id: 1, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}],
            [2, {id: 2, from: {id: 2, owner: {id: 2, email: 'string2', password: 'string', name: 'name2'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string2', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 200}],
            [3, {id: 3, from: {id: 3, owner: {id: 3, email: 'string3', password: 'string', name: 'name3'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string3', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 300}],
            [4, undefined],
            [5, undefined]
        ])('getByID', (id, payment) => {
            const returnValue = paymentService.getByID(id)

            expect(returnValue).toEqual(payment)
        });
    })
    describe('getAllByID-group', ()=>{
        test.each([
            [1, [{id: 2, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]],
            [2, [{id: 4, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]],
            [3, [{id: 8, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 3, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}, {id: 5, from: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name1'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, to: {id: 1, owner: {id: 1, email: 'string1', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}, sum: 100}]],
            [4, undefined],
            [5, undefined]
        ])('getAllByID', (id, payments) => {
            const returnValue = paymentService.getAllPayments(id)

            expect(returnValue).toEqual(payments)
        });
    })

})