import { Router } from 'express'
import { create, getAll, getById } from '../controllers/orderDetailController'
const router = Router()
router.route('/').post(create).get(getAll)
router.route('/:id').get(getById)
export default router
