import { Request, Response, NextFunction } from 'express'
const ensureEmailOrUsername = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { email, username } = req.body

   if (!email && !username) {
      res.status(400).json({
         success: false,
         message: 'Email atau Username harus diisi salah satu.'
      })
      return
   }

   next()
}

export { ensureEmailOrUsername }
