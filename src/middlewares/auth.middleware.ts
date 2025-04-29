import { Request, Response, NextFunction } from 'express'
const ensureEmailOrUsername = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { login_name } = req.body

   if (!login_name) {
      res.status(400).json({
         success: false,
         message: 'Email atau Username harus diisi salah satu.'
      })
      return
   }

   next()
}

export { ensureEmailOrUsername }
