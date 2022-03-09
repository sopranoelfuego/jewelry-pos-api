import { Router } from 'express'
import { create, getAll } from '../controllers/userController'
const router = Router()

router.route('/').get(getAll).post(create)
export default router
