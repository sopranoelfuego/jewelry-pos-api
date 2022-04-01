import jwt from 'jsonwebtoken'
import { User } from './types'

const publicKey = Buffer.from(`${process.env.PUBLIC_KEY}`, 'base64').toString(
 'ascii'
)

const privateKey = Buffer.from(`${process.env.PRIVATE_KEY}`, 'base64').toString(
 'ascii'
)

export function signJwt(
 user: { email: string },
 options?: jwt.SignOptions | undefined
) {
 return jwt.sign(user, privateKey, {
  ...(options && options),
  expiresIn: process.env.JWT_EXPIRE,
  algorithm: 'RS256',
 })
}
export function verifyJwt<T>(token: string) {
 try {
  const decod = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T
  return { payload: decod }
 } catch (error) {
  console.log(error)
  return {
   payload: null,
   expired: (error as any).message.include('jwt expired'),
  }
 }
}
