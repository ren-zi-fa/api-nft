import { checkSchema, ParamSchema } from 'express-validator'

type FieldSchema = Record<string, ParamSchema>

const NFT_image: FieldSchema = {
   nft_image: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'gambar tidak boleh kosong'
      },
      custom: {
         options: (value: string) => {
            if (!value.startsWith('http')) {
               throw new Error('URL gambar harus diawali dengan http')
            }
            return true
         }
      }
   }
}

const nft_name: FieldSchema = {
   nft_name: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'Nama NFT tidak boleh kosong'
      },
      isString: {
         errorMessage: 'harus berupa string'
      }
   }
}
const price: FieldSchema = {
   price: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'price tidak boleh kosong'
      },
      isInt: {
         errorMessage: 'harus berupa angka'
      }
   }
}
const status: FieldSchema = {
   status: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'price tidak boleh kosong'
      },
      isString: {
         errorMessage: 'harus berupa string'
      }
   }
}
const highest_bid: FieldSchema = {
   highest_bid: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'price tidak boleh kosong'
      },
      isInt: {
         errorMessage: 'harus berupa number'
      }
   }
}
const userId: FieldSchema = {
   userId: {
      in: ['body'],
      notEmpty: {
         errorMessage: 'price tidak boleh kosong'
      },
      isString: {
         errorMessage: 'harus berupa string'
      }
   }
}

const nftValidation = checkSchema({
   ...NFT_image,
   ...nft_name,
   ...highest_bid,
   ...status,
   ...price,
   ...userId
})

export { nftValidation }
