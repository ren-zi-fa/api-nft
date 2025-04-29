import { NextFunction, Request, Response } from 'express'
import { db } from '../config/firebase'
import { matchedData, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'

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
         message: 'Registrasi berhasil silahkan login'
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
      const { login_name, password } = data
      console.log(password, login_name)

      const isEmail = /@(gmail|yahoo|outlook|icloud)\.com$/.test(login_name)

      let userQuery

      if (isEmail) {
         userQuery = db
            .collection('users')
            .where('email', '==', login_name)
            .limit(1)
      } else {
         userQuery = db
            .collection('users')
            .where('username', '==', login_name)
            .limit(1)
      }

      const userSnapshot = await userQuery.get()

      if (userSnapshot.empty) {
         res.status(400).json({
            message: 'Username atau email tidak ditemukan'
         })
         return
      }

      const userDoc = userSnapshot.docs[0]
      const userId = userDoc.id
      const user = userDoc.data()

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
         res.status(400).json({ message: 'Password salah' })
         return
      }

      const JWT_SECRET = vars.JWT_SECRET as string

      const access_token = jwt.sign(
         {
            userId,
            username: user.username,
            email: user.email,
            tokenType: 'access'
         },
         JWT_SECRET,
         { expiresIn: '5m' }
      )

      const refresh_token = jwt.sign(
         { userId, tokenType: 'refresh' },
         JWT_SECRET,
         { expiresIn: '30d' }
      )

      await db.collection('users').doc(userId).update({
         refreshToken: refresh_token
      })

      res.status(200).json({
         message: 'Login berhasil',
         access_token,
         refresh_token
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: 'Terjadi kesalahan pada server',
         error: (error as Error).message
      })
   }
}

export { register, login }
