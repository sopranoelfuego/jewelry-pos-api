import { NextFunction, Request, Response } from 'express'
import { getSession } from '../utils/dbConnect'
import { verifyJwt } from '../utils/jwt'

export default function authMiddleware(
 req: Request,
 _: Response,
 next: NextFunction
) {
 const { accessToken, refreshToken } = req.cookies
 console.log(' refresh token', refreshToken)
 if (!accessToken) return next()
 const { payload, expired } = verifyJwt(accessToken)
 // ============ IN CASE OF VALID TOKEN===========
 if (payload) {
  //  @ts-ignore
  req.user = payload
  next()
 }
 // ============ IN CASE OF INVALID TOKEN AND EXPIRED ONE===========
 const { payload: refreshT } =
  expired && refreshToken ? verifyJwt(refreshToken) : { payload: null }

 if (refreshT === null) {
  console.log('no refresh token', verifyJwt(refreshToken))
  next()
 }
 // @ts-ignore
 const session = getSession(refreshT?.email, ({ err, data }) => {
  if (err) return next()
 })
 console.log('session here in authMiddlware', session)
 next()
}
