import { checkSchema, ParamSchema } from 'express-validator'
import {
   makeEmailField,
   makeLoginNameField,
   makeUsernameField
} from '../helper/schema.helper'

type FieldSchema = Record<string, ParamSchema>

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

const passwordConfirmationField: FieldSchema = {
   password_confirmation: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Konfirmasi password wajib diisi'
      },
      custom: {
         options: (value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('password yang anda inputkan tidak sesuai')
            }
            return true
         }
      }
   }
}

const registerValidation = checkSchema({
   ...makeUsernameField(),
   ...makeEmailField({
      includeIsEmail: true,
      includeCustomUniqueCheck: true,
      optional: false
   }),
   ...passwordField,
   ...passwordConfirmationField
})
const loginValidation = checkSchema({
   ...makeLoginNameField(),
   ...passwordField
})

export { registerValidation, loginValidation }
