import {IUserService} from "../../core/services/interface/types";
import * as express from 'express';
import {IUserValidate} from "../validators/interface/types";
import {userValidator} from "../validators/UserValidator";
import {userService} from "../../core/services/UserService";
import {authorizationData, IAuthorizationUserService} from "../services/AuthorizationService/interfaces/types";
import {userAuthService} from "../../../env/config";

export class HttpUserController {
    private userService: IUserService
    private userValidate: IUserValidate
    private authorizationService: IAuthorizationUserService

    constructor(userService: IUserService, userValidate: IUserValidate, authorizationService: IAuthorizationUserService) {
        this.userService = userService
        this.userValidate = userValidate
        this.authorizationService = authorizationService
    }

    async register(req: express.Request, res: express.Response) {
        try {
            const {email, password, name} = req.body.credentials

            const errorCredentials = userValidator.validateCredentials(email, password, name)
            if (errorCredentials) return res.json({status: 'error', errorText: errorCredentials})

            if (await this.userService.checkExistenceByEmail(email)) return res.json({status: "error", errorText: "Пользаватель уже зарегистрирован"})

            await this.userService.register({email, password, name})
            res.json({status: 'ok'})
        } catch (e) {
            res.json({status: 'error'})
        }
    }

    async login(req: express.Request, res: express.Response) {
        try {
            const {email, password} = req.body.credentials
            const errorCredentials = userValidator.validateCredentials(email, password)
            if (errorCredentials) return res.json({status: 'error', errorText: errorCredentials})
            if (!await userService.checkExistenceByEmail(email)) return res.json({status: 'error',errorText: 'Пользаватель ещё не зарегестрирован'})

            if (!await userService.checkPassword(email, password)) return {status: 'error', errorText: 'Пароль не верный'}

            const user = await this.userService.getUser(email)
            const token = this.authorizationService.createToken({id: user.id, email})

            res.json({status: 'ok', token: token})
        } catch (e) {
            res.json({status: 'error'})
        }
    }

    async setName(req: express.Request, res: express.Response) {
        try {
            const {name} = req.body.userInformationData
            const authorizationData = userAuthService.getData(req.headers['authorization']);

            if (!this.userValidate.validateName(name)) return res.json({status: 'error', errorText: 'Имя не корректно'})

            this.userService.setName(authorizationData.id, name)

            res.json({status: 'ok'})
        } catch (e) {
            res.json({status: 'error'})
        }
    }

    async setPassword(req: express.Request, res: express.Response) {
        try {
            const {password} = req.body.userInformationData
            const authorizationData = userAuthService.getData(req.headers['authorization'])
            const validateError = this.userValidate.validatePassword(password)
            if (validateError) res.json({status: 'error', errorText: validateError})

            this.userService.setPassword(authorizationData.id, password)
            res.json({status: 'ok'})
        } catch (e) {
            res.json({status: 'error'})
        }
    }
}
export const httpUserController = new HttpUserController(userService, userValidator, userAuthService)