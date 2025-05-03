import express from 'express'
import { authController } from '../controller'
import { loginValidation, registerValidation } from '../validation/auth.schema'
import { ensureEmailOrUsername } from '../middlewares/auth.middleware'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import { Refresh_Token } from '../model'
import { body, matchedData, validationResult } from 'express-validator'

const router = express.Router()

router.route('/register').post(registerValidation, authController.register)

router
   .route('/login')
   .post(ensureEmailOrUsername, loginValidation, authController.login)

router.post('/logout', authController.logout)
router.post('/refresh-token', authController.refreshToken)

export default router
