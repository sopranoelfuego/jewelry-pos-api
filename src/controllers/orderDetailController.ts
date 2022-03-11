import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import OrderDetailModel from '../models/orderDetailsModel'

// import { User } from '../utils/types'

//HERE MUST BE A GROUP OF ORDERDETAILS THEN SUBMIT ALL OF THEM ONE BY ONE
export const create = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderDetailModel()
  console.log('req.body:', req.body)
  model.create(req.body, (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const getAll = asyncHandler(
 async (__, res: Response, next: NextFunction) => {
  let model = new OrderDetailModel()
  model.getAll((err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
export const getById = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderDetailModel()
  model.getById(parseInt(req.params.id), (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
