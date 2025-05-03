import express from 'express'
import { matchedData, param, query, validationResult } from 'express-validator'
import { userController } from '../controller'

const router = express.Router()

router.get('/profile',userController.getCurrentUser)

export default router
