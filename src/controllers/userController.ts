import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'
import { User } from '../utils/types'
// import { User } from '../utils/types'

export const create = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.create(req.body, (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const getAll = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.getAll((err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
export const getById = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  console.log('id here', req.params.id)
  user.getById(parseInt(req.params.id), (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
