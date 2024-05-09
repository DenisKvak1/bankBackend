import {UserService} from "../../../../src/core/services/UserService";
import {CreateUserDTO} from "../../../../src/core/repository/UserRepository/dto/UserDTO";


describe('userService', () => {
    let userRepository
    let userService
    beforeAll(() => {
        userRepository = {
            create: jest.fn((dto: CreateUserDTO) => {
                return {id: 1, email: dto.email, password: dto.password, name: dto.name}
            }),
            getByID: jest.fn((id:number)=>{
                if(id === 1){
                    return {id: 1, email: 'string', password: 'string', name: 'name'}
                } else if(id === 2){
                    return {id: 1, email: 'string2', password: 'string2', name: 'name2'}
                } else if(id === 3){
                    return {id: 3, email: 'string3', password: 'string3', name: 'name3'}
                }
            }),
            getByEmail: jest.fn((email:string)=>{
                if(email === 'denis@example.com'){
                    return {id: 1, email: 'string', password: 'string', name: 'name'}
                } else if(email === 'john.doe@test.com'){
                    return {id: 1, email: 'string2', password: 'string2', name: 'name2'}
                } else if(email === 'anna_smith123@gmail.com'){
                    return {id: 3, email: 'string3', password: 'string3', name: 'name3'}
                }
            }),
            getAll: jest.fn().mockReturnValue([
                {id: 1, email: 'string', password: 'string', name: 'name'},
                {id: 1, email: 'string2', password: 'string2', name: 'name2'},
                {id: 3, email: 'string3', password: 'string3', name: 'name3'}
            ]),
            delete: jest.fn(),
            update: jest.fn()
        }
    })
    beforeEach(() => {
        userService = new UserService(userRepository as any)
    })
    describe('register-group', ()=>{
        test.each([
            ['denis@gmail.com', 'testPassword', 'denis', {id: 1, email: 'denis@gmail.com', password: 'testPassword', name: 'denis'}],
            ['john@gmail.com', 'testPassword123', 'john', {id: 1, email: 'john@gmail.com', password: 'testPassword123', name: 'john'}],
            ['anna@gmail.com', 'password123', 'anna', {id: 1, email: 'anna@gmail.com', password: 'password123', name: 'anna'}],
            ['sam@gmail.com', 'qwerty', 'sam', {id: 1, email: 'sam@gmail.com', password: 'qwerty', name: 'sam'}],
            ['alice@gmail.com', 'password', 'alice', {id: 1, email: 'alice@gmail.com', password: 'password', name: 'alice'}],
        ])('register', (email, password, name, expected) => {
            const returnedValue = userService.register({email, password, name});

            expect(userRepository.create).toHaveBeenCalledWith({email, password, name});
            expect(returnedValue).toEqual(expected);
        });
    })
    describe('getUser-group', ()=>{
        test.each([
            ['denis@example.com', {id:1, email: 'string', password: 'string', name: 'name'}],
            ['john.doe@test.com', {id: 1, email: 'string2', password: 'string2', name: 'name2'}],
            ['anna_smith123@gmail.com', {id: 3, email: 'string3', password: 'string3', name: 'name3'}],
        ])('getUser', (email, expected) => {
            const returnedValue = userService.getUser(email)

            expect(userRepository.getByEmail).toHaveBeenCalledWith(email);
            expect(returnedValue).toEqual(expected);
        });
    })
    describe('deleteUser-group', ()=>{
        test.each([1, 2, 3, 4, 5])('deleteUser', (id) => {
            userService.deleteUser(id)

            expect(userRepository.delete).toHaveBeenCalledWith(id);
        });
    })
    describe('setPassword-group', ()=>{
        test.each([
            [1, 'denis'],
            [2, 'genis'],
            [3, 'ananas'],
            [4, 'haba'],
            [5, 'КрутойПароль']
        ])('setPassword', (id , password) => {
            userService.setPassword(id, password)

            expect(userRepository.update).toHaveBeenCalledWith(id, {password: password});
        });
    })
    describe('setName-group', ()=>{
        test.each([
            [1, 'denis'],
            [2, 'genis'],
            [3, 'ananas'],
            [4, 'haba'],
            [5, 'КрутоЕИмя']
        ])('setName', (id , name) => {
            userService.setName(id, name)

            expect(userRepository.update).toHaveBeenCalledWith(id, {name: name});
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
            const returnValue = userService.checkExistence(id, expected)

            expect(returnValue).toBe(expected);
        });
    })
})