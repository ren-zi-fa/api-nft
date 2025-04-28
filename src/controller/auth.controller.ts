import { Request, Response } from 'express'
import { db } from '../config/firebase'
import { matchedData, query, validationResult } from 'express-validator/lib'

const register = async (req: Request, res: Response) => {
   const result = validationResult(req)
   if (result.isEmpty()) {
      const data = matchedData(req)
      await db.collection('users').add(data)
      res.status(201).json({ message: 'data berhasil di simpan', data: data })
      return
   }
   res.status(400).send({ errors: result.array() })
}

export { register }
