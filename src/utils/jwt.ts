import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { IAccessToken, IRefreshToken, User } from './types'
import { PRIVATE_KEY, PUBLIC_KEY } from './keys'

const publicKey = Buffer.from(PUBLIC_KEY, 'base64').toString('ascii')

const privateKey = Buffer.from(PRIVATE_KEY, 'base64').toString('ascii')

export function signJwt(
 payload: object,
 expiresIn: string | number,
 options?: jwt.SignOptions | undefined
) {
 return jwt.sign(payload, privateKey, {
  ...(options && options),
  expiresIn,
  algorithm: 'RS256',
 })
}
export const verifyAccessTokenJwt = (token: string) => {
 try {
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as IAccessToken
 } catch (error) {}
}
export const verifyRefreshTokenJwt = (token: string) => {
 try {
  return jwt.verify(token, publicKey, {
   algorithms: ['RS256'],
  }) as IRefreshToken
 } catch (error) {}
}
