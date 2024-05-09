import express from 'express';
import { httpATMController } from '../../Controllers/httpATMController';

export const ATMRoute = express.Router()

ATMRoute.post('/create', (req, res) => httpATMController.createATM(req, res))
ATMRoute.post('/replenishment', (req, res) => httpATMController.replenishment(req, res))
