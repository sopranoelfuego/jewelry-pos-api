import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const publicKey = Buffer.from(`${process.env.PUBLIC_KEY}`, 'base64').toString(
 'ascii'
)

const privateKey = Buffer.from(`${process.env.PRIVATE_KEY}`, 'base64').toString(
 'ascii'
)

export function signJwt(object: User, options?: jwt.SignOptions | undefined) {
 return jwt.sign(object, privateKey, {
  ...(options && options),
  expiresIn: process.env.JWT_EXPIRE,
  algorithm: 'RS256',
 })
}
export function verifyJwt<T>(token: string): T | null {
 try {
  const decod = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T
  return decod
 } catch (error) {
  console.log(error)
  return null
 }
}
