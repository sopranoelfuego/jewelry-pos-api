import { Router } from 'express'
import { create } from '../controllers/productController'
const router = Router()
router.route('/').post(create)
export default router
