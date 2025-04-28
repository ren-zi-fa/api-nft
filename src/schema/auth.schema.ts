import { checkSchema, ParamSchema } from 'express-validator';

type FieldSchema = Record<string, ParamSchema>;

const usernameField: FieldSchema = {
   username: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Username tidak boleh kosong',
      },
      isLength: {
         options: { min: 3 },
         errorMessage: 'Username minimal 3 karakter',
      },
   }
};

const emailField: FieldSchema = {
   email: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Email tidak boleh kosong',
      },
      isEmail: {
         errorMessage: 'Inputan harus berupa email yang valid',
      },
   }
};

const passwordField: FieldSchema = {
   password: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Password tidak boleh kosong',
      },
      isLength: {
         options: { min: 6 },
         errorMessage: 'Password minimal 6 karakter',
      },
      matches: {
         options: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
         errorMessage: 'Password harus mengandung huruf dan angka',
      },
   }
};

const authValidation = checkSchema({
   ...usernameField,
   ...emailField,
   ...passwordField,
});

export { authValidation };
