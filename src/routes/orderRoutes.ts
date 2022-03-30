import { Router } from 'express'
import {
 create,
 getAll,
 getById,
 getInvoiceBill,
} from '../controllers/orderController'
const router = Router()
router.route('/').post(create).get(getAll)
router.route('/:id').get(getById)
router.route('/invoice/:orderNumber').get(getInvoiceBill)
export default router
