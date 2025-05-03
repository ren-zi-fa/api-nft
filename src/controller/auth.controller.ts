import { NextFunction, Request, Response } from 'express'
import { db } from '../config/firebase'
import { matchedData, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import { FieldValue } from 'firebase-admin/firestore'
import { Refresh_Token, Role, UserModel } from '../model'

const JWT_SECRET = vars.JWT_SECRET as string
const register = async (req: Request, res: Response) => {
   try {
      const role: Role = 'buyer'
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
         role: role,
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
            tokenType: 'access',
            role: user.role
         },
         JWT_SECRET,
         { expiresIn: '15m' }
      )

      const refresh_token = jwt.sign(
         { userId, tokenType: 'refresh' },
         JWT_SECRET,
         { expiresIn: '30d' }
      )

      await db.collection('users').doc(userId).update({
         refreshToken: refresh_token
      })

      res.cookie('refresh_token', refresh_token, {
         httpOnly: true,
         secure: true,
         sameSite: 'strict',
         maxAge: 14 * 24 * 60 * 60 * 1000
      }).json({
         message: 'Login berhasil',
         access_token
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: 'Terjadi kesalahan pada server',
         error: (error as Error).message
      })
   }
}

const logout = async (req: Request, res: Response) => {
   try {
      const refreshToken = req.cookies.refresh_token
      if (!refreshToken) {
         res.status(400).json({ message: 'Refresh token tidak ditemukan' })
         return
      }

      const queryLogout = db
         .collection('users')
         .where('refreshToken', '==', refreshToken)
         .limit(1)

      const userSnapshot = await queryLogout.get()

      if (userSnapshot.empty) {
         res.status(400).json({
            message: 'Refresh token tidak valid atau sudah tidak aktif'
         })
         return
      }

      const doc = userSnapshot.docs[0]

      await doc.ref.update({
         refreshToken: FieldValue.delete() // hapus dari DB
      })

      res.clearCookie('refresh_token', {
         httpOnly: true,
         sameSite: 'strict',
         secure: true
      })

      res.status(200).json({ message: 'Logout berhasil' })
   } catch (error) {
      console.error('Error saat logout:', error)
      res.status(500).json({
         message: 'Terjadi kesalahan saat proses logout. Coba lagi nanti.'
      })
   }
}

const refreshToken = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { refresh_token } = req.cookies

   if (!refresh_token) {
      res.status(401).json({
         success: false,
         message: 'Refresh token tidak ada'
      })
      return
   }

   let decoded: Refresh_Token
   try {
      decoded = jwt.verify(refresh_token, JWT_SECRET) as Refresh_Token
   } catch (err) {
      res.status(403).json({
         success: false,
         message: 'Invalid or expired refresh token'
      })
      return
   }

   const { userId } = decoded

   try {
      const userDoc = await db.collection('users').doc(userId).get()

      if (!userDoc.exists) {
         res.status(404).json({
            success: false,
            error: 'User not found',
            message: `No user found for ID ${userId}`
         })
         return
      }

      const data = userDoc.data() as UserModel
      if (!data.email || !data.username || !data.role) {
         res.status(500).json({
            success: false,
            message: 'User data incomplete or corrupted'
         })
         return
      }

      const { email, username, role } = data

      const newAccessToken = jwt.sign(
         {
            userId,
            username,
            email,
            tokenType: 'access',
            role
         },
         JWT_SECRET,
         { expiresIn: '15m' }
      )

      res.status(200).json({ success: true, access_token: newAccessToken })
      return
   } catch (error) {
      console.error('Error refreshing token:', error)
      res.status(500).json({
         success: false,
         message: 'Internal server error'
      })
      return
   }
}

export { register, login, logout, refreshToken }
