import jwt from 'jsonwebtoken'
import { IAccessToken, IRefreshToken } from './types'
import { env } from './env'

const publicKey = Buffer.from(
 env.get('public_key') as string,
 'base64'
).toString('ascii')

const privateKey = Buffer.from(
 env.get('private_key') as string,
 'base64'
).toString('ascii')

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
