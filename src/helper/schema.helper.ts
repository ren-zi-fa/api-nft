import { ParamSchema } from 'express-validator'
import { db } from '../config/firebase'

interface EmailFieldOptions {
   optional?: boolean
   includeIsEmail?: boolean
   includeCustomUniqueCheck?: boolean
}

export function makeEmailField({
   optional = false,
   includeIsEmail = true,
   includeCustomUniqueCheck = true
}: EmailFieldOptions = {}): Record<string, ParamSchema> {
   const field: ParamSchema = {
      in: ['body']
   }

   if (optional) {
      field.optional = { options: { nullable: true } }
   } else {
      field.notEmpty = { errorMessage: 'Email tidak boleh kosong' }
   }

   if (includeIsEmail) {
      field.isEmail = { errorMessage: 'Harus email valid' }
   }

   if (includeCustomUniqueCheck) {
      field.custom = {
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

   return { email: field }
}

interface UsernameFieldOptions {
   optional?: boolean
   includeIsLength?: boolean
}

export function makeUsernameField({
   optional = false,
   includeIsLength = true
}: UsernameFieldOptions = {}): Record<string, ParamSchema> {
   const field: ParamSchema = {
      in: ['body']
   }

   if (optional) {
      field.optional = { options: { nullable: true } }
   } else {
      field.notEmpty = { errorMessage: 'Username tidak boleh kosong' }
   }

   if (includeIsLength) {
      field.isLength = {
         options: { min: 3 },
         errorMessage: 'Username minimal 3 karakter'
      }
   }

   field.matches = {
      options: [/^[^@]+$/],
      errorMessage: 'Username tidak boleh mengandung karakter @'
   }

   return { username: field }
}

export function makeLoginNameField(): Record<string, ParamSchema> {
   const field: ParamSchema = {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Login name wajib diisi'
      },
      isString: {
         errorMessage: 'Login name harus berupa string'
      }
   }

   return { login_name: field }
}
