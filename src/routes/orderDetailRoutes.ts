import { Router } from 'express'
import { create, getAll, getById } from '../controllers/orderDetailController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()
router.route('/').post(authMiddleware, create).get(authMiddleware, getAll)
router.route('/:id').get(authMiddleware, getById)
export default router
