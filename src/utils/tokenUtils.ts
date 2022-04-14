import { CookieOptions, Response } from 'express'

import { signJwt } from './jwt'

import { IAccessToken, IRefreshToken, User } from './types'

enum TokenExpiration {
 Access = 1 * 60,
 //  Refresh = 7 * 24 * 60 * 60,
 Refresh = 3 * 60,
 RefreshIfLessThan = 6 * 24 * 60 * 60,
}
const cookiesOptions: CookieOptions = {
 httpOnly: true,
 sameSite: process.env.ENV === 'production' ? 'strict' : 'lax',
}
export const createTokens = (user: User) => {
 const accessPayload: IAccessToken = { email: user.email }
 const refreshPayload: IRefreshToken = {
  email: user.email,
  tokenVersion: user.tokenVersion,
 }
 const accessToken = signJwt(accessPayload, TokenExpiration.Access)
 const refreshToken = signJwt(refreshPayload, TokenExpiration.Refresh)
 return { accessToken, refreshToken }
}

export const setCookies = (
 res: Response,
 accessToken: string,
 refreshToken?: string
) => {
 res.cookie('accessToken', accessToken, {
  ...cookiesOptions,
  maxAge: TokenExpiration.Access * 1000,
 })
 refreshToken &&
  res.cookie('refreshToken', refreshToken, {
   ...cookiesOptions,
   maxAge: TokenExpiration.Refresh * 1000,
  })
}

export function refreshTokens(current: IRefreshToken, tokenVersion: number) {
 if (tokenVersion !== current.tokenVersion) throw 'Token revoked'
 const accessPayload: IAccessToken = { email: current.email }
 let refreshPayload: IRefreshToken | undefined

 // @ts-ignore
 const expiration = new Date(current.exp * 1000)
 const now = new Date()
 const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000

 if (
  secondsUntilExpiration &&
  secondsUntilExpiration >= TokenExpiration.RefreshIfLessThan
 ) {
  refreshPayload = { email: current.email, tokenVersion }
 }

 const accessToken = signJwt(accessPayload, TokenExpiration.Access)
 const refreshToken =
  refreshPayload && signJwt(refreshPayload, TokenExpiration.Refresh)

 return { accessToken, refreshToken }
}

export const clearTokens = (res: Response) => {
 res.cookie('accessToken', '', { ...cookiesOptions, maxAge: 0 })
 res.cookie('refreshToken', '', { ...cookiesOptions, maxAge: 0 })
 res.send('logout successuffly...')
}
