import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import { Access_Token } from '../model'

const JWT_SECRET = vars.JWT_SECRET as string
const ensureEmailOrUsername = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { login_name } = req.body

   if (!login_name) {
      res.status(400).json({
         success: false,
         message: 'Email atau Username harus diisi salah satu.'
      })
      return
   }

   next()
}

const verifyUserRole = (req: Request, res: Response, next: NextFunction) => {
   const { access_token } = req.cookies
   try {
      const decoded = jwt.verify(access_token, JWT_SECRET) as Access_Token
      if (decoded.role === 'author') {
         next()
      } else {
         res.status(401).json({
            message: 'invalid user'
         })
      }
   } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
         res.status(401).json({ message: 'Access token sudah expired' })
      } else if (err.name === 'JsonWebTokenError') {
         res.status(401).json({ message: 'Access token tidak valid' })
      } else {
         res.status(500).json({ message: 'Terjadi kesalahan autentikasi' })
      }
   }
}

export { ensureEmailOrUsername, verifyUserRole }
