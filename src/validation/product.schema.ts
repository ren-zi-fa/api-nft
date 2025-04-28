import { checkSchema, ParamSchema } from 'express-validator'

type FieldSchema = Record<string, ParamSchema>

const sizeField: FieldSchema = {
   size: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Size tidak boleh kosong'
      },
      isInt: {
         errorMessage: 'Size harus berupa angka bulat'
      }
   }
}

const namaField: FieldSchema = {
   nama: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Nama tidak boleh kosong'
      },
      custom: {
         options: (value) => {
            if (/^\d+$/.test(value)) {
               throw new Error('Nama tidak boleh angka')
            }
            return true
         },
         errorMessage: 'Nama tidak boleh angka' // Tambahin errorMessage juga buat konsistensi
      }
   }
}

const productValidation = checkSchema({
   ...sizeField,
   ...namaField
})

export { productValidation }
