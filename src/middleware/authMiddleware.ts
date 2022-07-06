import { NextFunction, Request, Response } from 'express'
import userModel from '../models/userModel'
import { verifyAccessTokenJwt, verifyRefreshTokenJwt } from '../utils/jwt'
import { refreshTokens, setCookies } from '../utils/tokenUtils'
import { IUserResponse } from '../utils/types'

export default function authMiddleware(
 req: Request,
 res: Response,
 next: NextFunction
) {
 const { accessToken, refreshToken } = req.cookies
 const token = verifyAccessTokenJwt(accessToken)
 // ============ IN CASE OF VALID accessToken===========
 if (token) {
  //  @ts-ignore
  req.user = token
  return next()
 }
 // ============ IN CASE OF INVALID TOKEN , EXPIRED ONE OR EXPIRED REFRESHTOKEN===========
 const refreshT = refreshToken && verifyRefreshTokenJwt(refreshToken)

 const user = new userModel()
 if (!refreshT) {
  return res.status(403).send('log in first..!')
 }
 //  find user by refreshToken.email
 user.findByEmail(refreshT.email, (err: Error | null, doc: IUserResponse) => {
  if (err) throw new Error(`error acure: ${err}`)
  const { data } = doc
  const { accessToken, refreshToken } = refreshTokens(
   refreshT,
   data[0].tokenVersion
  )
  if (!refreshToken || !accessToken) {
   return res.send('log in again !')
  }
  setCookies(res, accessToken, refreshToken)

  //   @ts-ignore
  req.user = verifyAccessTokenJwt(accessToken)
  return next()
 })

 //then must be authentificated
}
