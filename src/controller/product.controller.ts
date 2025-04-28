import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator/lib'

const saveProducts = (req: Request, res: Response) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
   }

   const validData = matchedData(req)

   res.status(200).json({
      message: 'Produk berhasil disimpan',
      data: validData
   })
}

export { saveProducts }
