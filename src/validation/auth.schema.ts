import { checkSchema, ParamSchema } from 'express-validator'
import { db } from '../config/firebase'

type FieldSchema = Record<string, ParamSchema>

const usernameField: FieldSchema = {
   username: {
      in: ['body'],
      optional: true,
      isLength: {
         options: { min: 3 },
         errorMessage: 'Username minimal 3 karakter'
      },
      custom: {
         options: async (value) => {
            if (value) {
               const userRef = await db
                  .collection('users')
                  .where('username', '==', value)
                  .get()
               if (userRef.empty) {
                  throw new Error('Username tidak ditemukan')
               }
            }
            return true
         }
      }
   }
}

const emailField: FieldSchema = {
   email: {
      in: ['body'],
      optional: true,
      notEmpty: {
         errorMessage: 'Email tidak boleh kosong'
      },
      isEmail: {
         errorMessage: 'Inputan harus berupa email yang valid'
      },
      custom: {
         options: async (value) => {
            const userRef = await db
               .collection('users')
               .where('email', '==', value)
               .get()

            if (!userRef.empty) {
               throw new Error('Email sudah terdaftar')
            }
            return true
         }
      }
   }
}

const passwordField: FieldSchema = {
   password: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Password tidak boleh kosong'
      },
      isLength: {
         options: { min: 6 },
         errorMessage: 'Password minimal 6 karakter'
      },
      matches: {
         options: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
         errorMessage: 'Password harus mengandung huruf dan angka'
      }
   }
}

const registerValidation = checkSchema({
   ...usernameField,
   ...emailField,
   ...passwordField
})
const loginValidation = checkSchema({
   ...usernameField,
   ...emailField,
   ...passwordField
})

export { registerValidation, loginValidation }
