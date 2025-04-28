import { Request, Response } from 'express'
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
      const { username, email, password } = data

      let userQuery

      if (email) {
         userQuery = db.collection('users').where('email', '==', email).limit(1)
      } else if (username) {
         userQuery = db
            .collection('users')
            .where('username', '==', username)
            .limit(1)
      } else {
         res.status(400).json({
            message: 'Username atau email harus diisi'
         })
         return
      }
      const userSnapshot = await userQuery.get()

      if (userSnapshot.empty) {
         res.status(400).json({ message: 'User tidak ditemukan' })
         return
      }
      const userDoc = userSnapshot.docs[0]
      const userId = userDoc.id

      const user = userSnapshot.docs[0].data()
      const isPasswordValid = await bcrypt.compare(password, user.password)
      const JWT_SECRET = vars.JWT_SECRET as string
      const acces_token = jwt.sign(
         {
            userId: userId,
            username: username,
            email: email,
            tokenType: 'access'
         },
         JWT_SECRET,
         {
            expiresIn: '3h'
         }
      )
      const refresh_token = jwt.sign(
         { userId: userId, tokenType: 'refresh' },
         JWT_SECRET,
         { expiresIn: '30d' }
      )

      await db.collection('users').doc(userId).update({
         refreshToken: refresh_token
      })

      if (!isPasswordValid) {
         res.status(400).json({ message: 'Password salah' })
         return
      }

      res.status(200).json({
         message: 'Login berhasil',
         acces_token: acces_token,
         refres_token: refresh_token
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
