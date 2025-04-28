import express, { NextFunction, Request, Response } from 'express'
import { authController } from '../controller'
import { query, validationResult } from 'express-validator'
import { authValidation } from '../schema/auth.schema'

const router = express.Router()

router
   .route('/register')
   .post(authValidation,authController.register)


export default router
