import { Router } from 'express'
import { create, getAll, getById } from '../controllers/userController'
const router = Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getById)
export default router
