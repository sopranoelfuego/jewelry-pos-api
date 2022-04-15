import { createHash, randomBytes } from 'crypto'

export const hashGivenCode = (code: string) => {
 return createHash('sha256').update(code).digest('hex')
}
export const getCodeExpireTime = () => Date.now() + 1 * (24 * 3600) * 1000 // 1day
export const getEmailVerificationCode = (): {
 code: string
 hashedCode: string
} => {
 const code = randomBytes(3).toString('hex').toUpperCase()
 const hashedCode = hashGivenCode(code)
 return { code, hashedCode }
}
