import { Request, Response } from 'express'
import { db } from '../config/firebase'

const register = async (req: Request, res: Response) => {
   const { username, password } = req.body
   await db.collection('users').add({ username, password })
   res.status(201).send({
      data: {
         username,
         password
      }
   })
}

export { register }
