import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { User } from './types'
import { PRIVATE_KEY, PUBLIC_KEY } from './keys'

const publicKey = Buffer.from(PUBLIC_KEY, 'base64').toString('ascii')
console.log('publickey', `${process.env.PUBLIC_KEY}`)
const privateKey = Buffer.from(PRIVATE_KEY, 'base64').toString('ascii')
console.log('privateckey', `${process.env.PRIVATE_KEY}`)

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
export function verifyJwt<T>(token: string) {
 try {
  const decod = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T
  return { payload: decod, expired: false }
 } catch (error) {
  console.log('error:', error)
  return {
   payload: null,
   expired: true,
  }
 }
}
