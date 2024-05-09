import {CreateUserDTO} from "../../../src/core/repository/UserRepository/dto/UserDTO";
import {AccountService} from "../../../src/core/services/AccountService";

describe('accountService', () => {
    let accountRepository
    let accountService
    beforeAll(() => {
        accountRepository = {
            create: jest.fn((dto: CreateUserDTO) => {
                return 'create'
            }),
            getByID: jest.fn((id:number)=>{
                if(id === 1){
                    return {id: 1, owner: {id: 1, email: 'string', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}
                } else if(id === 2){
                    return {id: 2, owner: {id: 2, email: 'string2', password: 'string2', name: 'name2'}, balance: 200, publicID: 'e07-ffa69cfa8a69'}
                } else if(id === 3){
                    return {id: 3, owner: {id: 3, email: 'string3', password: 'string3', name: 'name3'}, balance: 300, publicID: 'e08cc3d0-b845-4424-a317-ffa69cfa8a69'}
                }
            }),
            getByPublicID: jest.fn((email:string)=>{
                if(email === 'e09cc3d0-b845-4424-a317-ffa69cfa8a69'){
                    return {id: 1, owner: {id: 1, email: 'string', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'}
                } else if(email === 'e07-ffa69cfa8a69'){
                    return {id: 2, owner: {id: 2, email: 'string2', password: 'string2', name: 'name2'}, balance: 100, publicID: 'e07-ffa69cfa8a69'}
                } else if(email === 'e08cc3d0-b845-4424-a317-ffa69cfa8a69'){
                    return {id: 3, owner: {id: 3, email: 'string3', password: 'string3', name: 'name3'}, balance: 100, publicID: 'e08cc3d0-b845-4424-a317-ffa69cfa8a69'}
                }
            }),
            getAll: jest.fn().mockReturnValue([
                {id: 1, owner: {id: 1, email: 'string', password: 'string', name: 'name'}, balance: 100, publicID: 'e09xssada424-a317-ffa69cfa8a69'},
                {id: 2, owner: {id: 2, email: 'string2', password: 'string2', name: 'name2'}, balance: 100, publicID: 'e07-ffa69cfa8a69'},
                {id: 3, owner: {id: 3, email: 'string3', password: 'string3', name: 'name3'}, balance: 100, publicID: 'e08cc3d0-b845-4424-a317-ffa69cfa8a69'}
            ]),
            delete: jest.fn(),
            update: jest.fn()
        }
    })
    beforeEach(() => {
        accountService = new AccountService(accountRepository as any)
    })
    describe('addBalance-group', ()=>{
        test.each([
            [1, 100, 200],
            [2, 0, 200],
            [3, 1000, 1300],
        ])('addBalance', (id , sum, expected) => {
            accountService.addBalance(id, sum)
            expect(accountRepository.update).toHaveBeenCalledWith(id, {balance: expected})
        });
    })
    describe('removeBalance-group', ()=>{
        test.each([
            [1, 100, 0],
            [2, 0, 200],
            [3, 1000, -700],
        ])('removeBalance', (id , sum, expected) => {
            accountService.removeBalance(id, sum)
            expect(accountRepository.update).toHaveBeenCalledWith(id, {balance: expected})
        });
    })
    describe('createAccount-group', ()=>{
        test.each([
            [1, 'create'],
            [2, 'create'],
            [3, 'create'],
            [4, 'create'],
            [5, 'create'],
        ])('createAccount', (id, expected) => {
            const returnedValue = accountService.createAccount(id, expected);

            expect(accountRepository.create).toHaveBeenCalledWith(expect.objectContaining({ownerId: id}));
            expect(returnedValue).toEqual(expected);
        });
    })
    describe('checkExistence-group', ()=>{
        test.each([
            [1, true],
            [2, true],
            [3, true],
            [4, false],
            [5, false]
        ])('checkExistence', (id , expected) => {
            const returnValue = accountService.checkExistence(id, expected)

            expect(returnValue).toBe(expected);
        });
    })
})