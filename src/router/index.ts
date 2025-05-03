import express, { Router } from 'express'
import authRouter from './auth.route'
import userRouter from './user.route'
import nftRouter from './nft.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)

router.use('/nft', nftRouter)
export { router }
