import * as express from "express";
import {NextFunction} from "express";
import {IAuthorizationUserService} from "../../services/AuthorizationService/interfaces/types";

export function authenticationMiddleware(req: express.Request, res: express.Response, next: NextFunction, authorizationService: IAuthorizationUserService) {
    const token = req.headers['authorization'] as string
    const isAuth = authorizationService.
    verify(token)
    if(isAuth) return next()
    res.json({status: 'error', errorText: 'Не авторизован'})
}