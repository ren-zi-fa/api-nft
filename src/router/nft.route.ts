import express from 'express'
import { query } from 'express-validator'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import { verifyUserRole } from '../middlewares/auth.middleware'
import { nftController } from '../controller'
import { nftValidation } from '../validation/nft.schema'
const router = express.Router()
const JWT_SECRET = vars.JWT_SECRET as string

router
   .route('/nft_item')
   .post(verifyUserRole, nftValidation, nftController.addNft)
export default router
