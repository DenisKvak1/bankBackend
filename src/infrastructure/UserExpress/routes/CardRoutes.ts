import express from 'express';
import { httpCreditController } from '../../Controllers/httpCardController';
import { IWebSocketClientsController } from '../module/interfaces/types';

export const cardRouter = express.Router()

cardRouter.post('/create', (req, res) => httpCreditController.createCard(req, res))
cardRouter.post('/transfer', (req, res) => httpCreditController.transfer(req, res))
cardRouter.post('/debitRequest', (req, res) => httpCreditController.debitRequest(req, res,))
cardRouter.post('/debitResponse', (req, res) =>  httpCreditController.debitResponse(req, res))