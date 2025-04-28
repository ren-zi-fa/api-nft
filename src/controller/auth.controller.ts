import { Request, Response } from 'express'
import { db } from '../config/firebase'
import { matchedData, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

const register = async (req: Request, res: Response) => {
   try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
         res.status(400).json({
            success: false,
            message: result.array()
         })
         return
      }

      const data = matchedData(req)
      const { password, username, email } = data
      const hashedPassword = await bcrypt.hash(password, 10)
      await db.collection('users').add({
         email,
         username,
         password: hashedPassword
      })

      res.status(201).json({
         success: true,
         message: 'Registrasi berhasil',
         data: {
            email,
            username,
            password: hashedPassword
         }
      })
   } catch (error) {
      console.error((error as Error).message)
      res.status(500).json({
         success: false,
         message: 'Terjadi kesalahan saat registrasi'
      })
   }
}

const login = async (req: Request, res: Response) => {
   try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
         res.status(400).json({
            success: false,
            message: result.array()
         })
         return
      }
      const data = matchedData(req)
      
   } catch (error) {}
   const result = validationResult(req)
}

export { register, login }
