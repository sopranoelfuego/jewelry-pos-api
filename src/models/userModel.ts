// import { query } from 'express'
import Connection from '../utils/dbConnect'
import { CreateProduct, User, CreateUser } from '../utils/types'
import { hashGivenCode } from '../utils/authUtils'
export default class userModel {
 getAll(cb: Function): any {
  const qry = 'select * from user order by id desc'
  Connection.query(qry, (err: Error | null, data: [User]) => {
   return cb(err, { success: true, data })
  })
 }
 create(newData: CreateUser, cb: Function) {
  const qry = 'insert into user set ?'

  Connection.query(qry, [newData], (err: Error | null, data: Object) => {
   cb(err, { success: true, data })
  })
 }
 update(newData: CreateUser, cb: Function) {
  const qry = 'update user set ? where email=?'

  Connection.query(
   qry,
   [newData, newData.email],
   (err: Error | null, data: User[]) => {
    if (data.length >= 0) {
     return cb(err, { success: false, data })
    } else cb(err, { success: true, data })
   }
  )
 }
 getById(id: User['id'], cb: Function) {
  const qry = 'select * from user where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }

 //  CUSTOM FUNCTION
 findByEmail(email: User['email'], cb: Function) {
  const qry = 'select * from user where email=?'
  Connection.query(qry, [email.trim()], (err: Error | null, data: [User]) => {
   if (data.length <= 0) cb(err, { success: false, data })
   else cb(err, { success: true, data })
  })
 }
 incrementTokenVersion(email: User['email'], cb: Function) {
  const qry = 'update user set tokenVersion=tokenVersion+1 where email=?'
  Connection.query(qry, [email.trim()], (err: Error | null, data: [User]) => {
   if (data.length <= 0) cb(err, { success: false, data })
   else cb(err, { success: true, data })
  })
 }
 findUserByCode(code: User['code'], cb: Function) {
  const hashedCode = hashGivenCode(code)
  const qry = `select from user where code=? and codeExpireTime>${Date.now}`
  Connection.query(qry, [hashedCode], (err: Error | null, data: [User]) => {
   if (data.length <= 0)
    cb(err, { success: false, message: 'invalid code or is expired...' })
   else cb(err, { success: true, data })
  })
 }
 activateAcount(code: User['code'], cb: Function) {
  const qry = 'update user set active=1 where code= ?'
  Connection.query(qry, [code.trim()], (err: Error | null, data: [User]) => {
   if (data.length <= 0) cb(err, { success: false, data })
   else cb(err, { success: true, data })
  })
 }
}
