import { NextFunction, Request, Response } from 'express'
import { verifyJwt } from '../utils/jwt'

export default function authMiddleware(
 req: Request,
 _: Response,
 next: NextFunction
) {
 const { accessToken } = req.cookies
 if (!accessToken) return next()
 const { payload } = verifyJwt(accessToken)
 if (payload) {
  //  @ts-ignore
  req.user = payload
  next()
 }
 next()
}
