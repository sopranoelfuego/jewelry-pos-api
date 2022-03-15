import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel'

import niceInvoice from 'nice-invoice'

// import { User } from '../utils/types'

export const create = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.create(req.body, (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const getAll = asyncHandler(
 async (__, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getAll((err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
export const getById = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getById(parseInt(req.params.id), (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
export const getFile = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getDetailedOrder(
   parseInt(req.params.id),
   (err: Error | null, doc: Object) => {
    if (err) return next(new Error(err.message))
    //    res.json(doc)
   }
  )
 }
)
