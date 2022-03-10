import { Router } from 'express'
import { create, getAll, getById } from '../controllers/productController'
const router = Router()
router.route('/').post(create).get(getAll)
router.route('/:id').get(getById)
export default router
