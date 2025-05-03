import { Response, Request, NextFunction } from 'express'
import { matchedData, validationResult } from 'express-validator/lib'
import { db } from '../config/firebase'
import { UserModel } from '../model'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
const JWT_SECRET = vars.JWT_SECRET as string
const getCurrentUser = async (
   req: Request,
   res: Response,
) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]

   if (!token) {
      res.status(401).json({ error: 'No token provided' })
      return
   }

   try {
      const user = jwt.verify(token, JWT_SECRET)
      res.json({success:true, data: user })
     
   } catch (err: any) {
      console.error('JWT Error:', err.message)

      if (err.name === 'JsonWebTokenError') {
         res.status(401).json({ error: 'Invalid token (malformed)' })
         return
      } else if (err.name === 'TokenExpiredError') {
         res.status(401).json({ error: 'Token expired' })
         return
      } else {
         res.status(500).json({ error: 'Internal server error' })
         return
      }
   }
}

export { getCurrentUser }
