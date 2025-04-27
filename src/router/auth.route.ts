import express, { NextFunction, Request, Response } from 'express'
import { authController } from '../controller'

const router = express.Router()

router.route('/register').post(authController.register)

export default router
