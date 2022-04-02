import { Router } from 'express'
import { create, getAll, getById, signIn } from '../controllers/userController'
const router = Router()

router.route('/').get(getAll).post(create)
router.route('/:id').get(getById)
router.route('/auth').post(signIn)
export default router
