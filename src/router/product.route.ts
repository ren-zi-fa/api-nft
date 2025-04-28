import express from 'express'
import { productController } from '../controller'
import { productValidation } from '../validation/product.schema'

const router = express.Router()

router.route('/').post(productValidation, productController.saveProducts)

export default router
