import { Router } from 'express'
import {
 create,
 getAll,
 getById,
 signIn,
 logout,
 update,
 requestActivateAccount,
 activateAcount,
} from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'
const router = Router()

router.route('/').get(authMiddleware, getAll).post(create)
router.route('/:id').get(authMiddleware, getById).put(authMiddleware, update)
router.route('/auth').post(signIn).delete(authMiddleware, logout)
router
 .route('/activate/account')
 .get(requestActivateAccount)
 .post(activateAcount)

export default router
