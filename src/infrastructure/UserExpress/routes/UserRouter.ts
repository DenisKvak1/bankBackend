import express from "express";
import {httpUserController} from "../../Controllers/httpUserController";

export const userRouter = express.Router()

userRouter.post('/register', (req, res) => httpUserController.register(req, res))
userRouter.post('/login', (req, res) => httpUserController.login(req, res))
userRouter.post('/setName', (req, res) => httpUserController.setName(req, res))
userRouter.post('/changePassword', (req, res) => httpUserController.setPassword(req, res))