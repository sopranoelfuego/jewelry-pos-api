import { Router } from 'express'
import {
 create,
 getAll,
 getById,
 getInvoice,
} from '../controllers/orderController.js'
const router = Router()
router.route('/').post(create).get(getAll)
router.route('/:id').get(getById)
router.route('/invoice/:id').get(getInvoice)
export default router
