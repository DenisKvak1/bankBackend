import express from 'express';
import { httpCreditController } from '../../Controllers/httpCardController';

export const cardRouter = express.Router()
cardRouter.post('/validateRequisites', (req, res) => httpCreditController.checkValidRequisites(req, res))

cardRouter.post('/checkExist', (req, res) => httpCreditController.checkExistence(req, res))
cardRouter.post('/debitRequest', (req, res) => httpCreditController.debitRequest(req, res))
cardRouter.get('/checkDebitStatus/:id', (req, res) => httpCreditController.getDebitStatus(req, res))

cardRouter.post('/create', (req, res) => httpCreditController.createCard(req, res))

cardRouter.post('/transfer', (req, res) => httpCreditController.transfer(req, res))
cardRouter.post('/debitRequest', (req, res) => httpCreditController.debitRequest(req, res,))
cardRouter.post('/debitResponse', (req, res) =>  httpCreditController.debitResponse(req, res))