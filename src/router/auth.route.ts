import express from 'express'
import { authController } from '../controller'
import { loginValidation, registerValidation } from '../validation/auth.schema'
import { ensureEmailOrUsername } from '../middlewares/auth.middleware'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import { RefreshTokenPayload } from '../types'
import { body, matchedData, validationResult } from 'express-validator'

const JWT_SECRET = vars.JWT_SECRET as string
const router = express.Router()

router.route('/register').post(registerValidation, authController.register)

router
   .route('/login')
   .post(ensureEmailOrUsername, loginValidation, authController.login)

router.post(
   '/logout',
   body('refresh_token').notEmpty().withMessage('Refresh token wajib diisi'),
   (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() })
         return
      }
      next()
   },
   authController.logout
)
router.post('/refresh-token', body('refresh_token').notEmpty(), (req, res) => {
   const data = validationResult(req)
   if (!data.isEmpty()) {
      res.status(401).json({
         message: 'refresh_token kosong'
      })
      return
   }
   const result = matchedData(req)
   const { refresh_token } = result
   try {
      const payload = jwt.verify(
         refresh_token,
         JWT_SECRET
      ) as RefreshTokenPayload
      const newAccessToken = jwt.sign(
         {
            userId: payload.userId,
            username: payload.username,
            email: payload.email,
            tokenType: 'access'
         },
         JWT_SECRET,
         { expiresIn: '3m' }
      )

      res.json({ accessToken: newAccessToken })
   } catch (err) {
      res.status(401).json({ message: 'Invalid refresh token' })
      return
   }
})

export default router
