import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'
import { verifyAccessTokenJwt } from '../utils/jwt'
import { clearTokens, createTokens, setCookies } from '../utils/tokenUtils'
import { IUserResponse, User } from '../utils/types'
import { getCodeExpireTime, getEmailVerificationCode } from '../utils/authUtils'
// import { mailer } from '../utils/nodemailer'

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
    // in case the user account is not yet activateAcount
    if (data[0].active.trim() === '0')
     return res.json({
      success: true,
      message: 'account is not yet activated..!!',
     })
    //  create access token & refreshToken
    const { accessToken, refreshToken } = createTokens(data[0])
    // set cookies
    setCookies(res, accessToken, refreshToken)

    res.json({ success: true, data: verifyAccessTokenJwt(accessToken) })
   }
  )
 }
)
export const update = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.update(req.body, (err: Error | null, doc: IUserResponse) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const create = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  const codeExpireTime = getCodeExpireTime()
  const { code, hashedCode } = getEmailVerificationCode()
  user.create(
   { ...req.body, tokenVersion: 0, code: hashedCode, codeExpireTime },
   (err: Error | null, doc: Object) => {
    if (err) return next(new Error(err.message))
    try {
     // THEN HERE I MUST SEND THE EMAIL WITH CODE
     //  mailer.sendMail({
     //   from: 'no-reply@jewerly.com',
     //   to: req.body.email,
     //   subject: 'Account Verification',
     //   context: { code },
     //  } as IMailerOptions)
     console.log('verification sent')
     res.json({ success: true, data: code })
    } catch (error) {}
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
// WHEN THE USER ASK TO ACTIVATE HIS/HER ACCOUNT
export const requestActivateAccount = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()
  user.findByEmail(
   req.params.email,
   (err: Error | null, doc: IUserResponse) => {
    if (err) return next(new Error(err.message))
    if (!doc.success)
     return res.json({ success: false, message: 'user not found' })
    const codeExpireTime = getCodeExpireTime()
    const { code, hashedCode } = getEmailVerificationCode()
    const userToUpdate: User = {
     ...doc.data[0],
     code: hashedCode,
     codeExpireTime,
    }
    user.update(userToUpdate, (err: Error | null, doc: IUserResponse) => {
     if (err) return next(new Error(err.message))
     if (!doc.success)
      return res.json({
       success: false,
       message: 'code not sent retry again...',
      })
     //      HERE WE MUST SEND THE CODE VIA NODEMAILER
     //  ====================================================

     res.json({ success: true, data: code })
    })
    //  user.
   }
  )
 }
)
export const activateAcount = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let user = new UserModel()

  user.findUserByCode(
   req.body.code,
   (err: Error | null, doc: IUserResponse) => {
    if (err) return next(new Error(err.message))
    if (!doc.success)
     return res.json({
      success: false,
      data: 'code error or user may not be registreted yet',
     })
    user.activateAcount(req.body.code, (err: Error | null, doc: Object) => {
     if (err) return next(new Error(err.message))
     res.json({
      success: true,
      message: 'valid code and account successfull activated',
     })
    })
   }
  )
 }
)
