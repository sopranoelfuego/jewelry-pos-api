import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'
import { createSession } from '../utils/dbConnect'
import { signJwt, verifyAccessTokenJwt } from '../utils/jwt'
import { clearTokens, createTokens, setCookies } from '../utils/tokenUtils'
import { IUserResponse, User } from '../utils/types'
// import { User } from '../utils/types'

export const signIn = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  new UserModel().findByEmail(
   email.trim(),
   (err: Error | null, doc: IUserResponse) => {
    if (err) return next(new Error(err.message))
    const { success, data } = doc
    if (!success || !(data[0]?.password === password)) {
     return res.json({
      success: false,
      message: 'invalid user or wrong password',
     })
    }
    //  create access token & refreshToken
    const { accessToken, refreshToken } = createTokens(data[0])
    // set cookies
    setCookies(res, accessToken, refreshToken)

    res.json({ success: true, data: verifyAccessTokenJwt(accessToken) })
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
  user.create(
   { ...req.body, tokenVersion: 0 },
   (err: Error | null, doc: Object) => {
    if (err) return next(new Error(err.message))
    res.json(doc)
   }
  )
 }
)

export const getAll = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.getAll((err: Error | null, doc: Object) => {
   if (err) {
    console.log('error:', err.message)
    return next(new Error(err.message))
   }
   res.json(doc)
  })
 }
)
export const getById = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.getById(parseInt(req.params.id), (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const logout = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  //   @ts-ignore
  const { email } = req.user
  user.incrementTokenVersion(email, (err: Error | null, _: Object) => {
   if (err) return next(new Error(err.message))
   clearTokens(res)
  })
 }
)
