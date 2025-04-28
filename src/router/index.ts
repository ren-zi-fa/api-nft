import express, { Router } from 'express'
import authRouter from './auth.route'
import productRouter from './product.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)

export { router }
