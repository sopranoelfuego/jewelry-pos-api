import { Router } from 'express'
import {
 create,
 getAll,
 getById,
 signIn,
 logout,
} from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'
const router = Router()

router.route('/').get(authMiddleware, getAll).post(create)
router.route('/:id').get(getById)
router.route('/auth').post(signIn).delete(authMiddleware, logout)

export default router
