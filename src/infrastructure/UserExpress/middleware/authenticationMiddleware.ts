import * as express from "express";
import {NextFunction} from "express";
import {IAuthorizationUserService} from "../../services/AuthorizationService/interfaces/types";

export function authenticationMiddleware(req: express.Request, res: express.Response, next: NextFunction, authorizationService: IAuthorizationUserService) {
    const token = req.headers['authorization'] as string
    const isAuth = authorizationService.verify(token)

    if(req.path === "/user/register") return next()
    if(req.path === "/user/login") return next()
    if(req.path === "/card/checkExist") return next()
    if(req.path === "/card/debitRequest") return next()
    if(req.path === ('/card/validateRequisites')) return next()
    if(req.path === '/card/checkSufficientBalance') return next()
    if(req.path.startsWith('/card/checkDebitStatus')) return next()

    if(isAuth) return next()
    res.json({status: 'error', errorText: 'Не авторизован'})
}