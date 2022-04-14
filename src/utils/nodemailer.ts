import * as nodemailer from 'nodemailer'
import { env } from './env'
const transporter = nodemailer.createTransport({
 host: env.get('host_service'),
 port: Number(env.get('host_service_port')) || 0,
 auth: {
  user: env.get('user_email'),
  pass: env.get('user_password'),
 },
})

export const mailer = transporter
