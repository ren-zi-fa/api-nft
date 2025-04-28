import express, { NextFunction, Request, Response } from 'express'
import { authController } from '../controller'
import { loginValidation, registerValidation } from '../validation/auth.schema'

const router = express.Router()

router.route('/register').post(registerValidation, authController.register)

router.route('/login').post(loginValidation, authController.login)

export default router
