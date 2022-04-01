import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'
import { signJwt, verifyJwt } from '../utils/jwt'
import { IUserResponse, User } from '../utils/types'
// import { User } from '../utils/types'

export const signIn = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  new UserModel().findByEmail(
   email,
   (err: Error | null, doc: IUserResponse) => {
    if (err) return next(new Error(err.message))
    if (!doc.success || !doc['data'].find(p => p.password === password))
     return res.json({
      success: false,
      message: 'invalid user or wrong password',
     })

    //  create access token
    const accessToken = signJwt({ email })

    //set cookie for that token
    res.cookie('accessToken', accessToken, {
     maxAge: 3000000,
     httpOnly: true,
    })
    res.json({ success: true, data: verifyJwt(accessToken).payload })
   }
  )
 }
)
export const signOut = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('accessToken', '', {
   maxAge: 0,
   httpOnly: true,
  })
  res.json({ success: true, message: 'logout' })
 }
)
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
