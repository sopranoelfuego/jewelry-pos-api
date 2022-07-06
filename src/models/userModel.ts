import Connection from '../utils/dbConnect'
import { ISQLResponseMutation, User, CreateUser } from '../utils/types'
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

  Connection.query(
   qry,
   [newData],
   (err: Error | null, data: ISQLResponseMutation) => {
    if (data?.insertId <= 0)
     return cb(err, { success: false, data: 'error data not inserted..' })
    cb(err, { success: true, data })
   }
  )
 }
 update(newData: CreateUser, cb: Function) {
  const qry = 'update user set ? where email=?'

  Connection.query(
   qry,
   [newData, newData.email],
   (err: Error | null, data: ISQLResponseMutation) => {
    if (data?.affectedRows <= 0) {
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
  console.log('find by email:', email)
  const qry = 'select * from user where email=? and code is null'
  Connection.query(qry, [email.trim()], (err: Error | null, data: [User]) => {
   if (data.length <= 0) cb(err, { success: false, data })
   else cb(err, { success: true, data })
  })
 }
 incrementTokenVersion(email: User['email'], cb: Function) {
  const qry = 'update user set tokenVersion=tokenVersion+1 where email=?'
  Connection.query(
   qry,
   [email.trim()],
   (err: Error | null, data: ISQLResponseMutation) => {
    if (data.affectedRows <= 0)
     return cb(err, { success: false, data: 'error data not inserted..' })
    else cb(err, { success: true, data })
   }
  )
 }
 findUserByCode(code: User['code'], cb: Function) {
  const hashedCode = hashGivenCode(code)
  const qry = `select * from user where code=? and codeExpireTime>${Date.now().toString()}`
  Connection.query(qry, [hashedCode], (err: Error | null, data: [User]) => {
   if (err) throw err.message
   if (data.length <= 0)
    cb(err, { success: false, message: 'invalid code or is expired...' })
   else cb(err, { success: true, data })
  })
 }
 activateAcount(code: User['code'], cb: Function) {
  const hashedCode = hashGivenCode(code)

  const qry = `update user set active='1',code=null where code= ?`
  Connection.query(
   qry,
   [hashedCode.trim()],
   (err: Error | null, data: ISQLResponseMutation) => {
    if (data.affectedRows <= 0)
     return cb(err, { success: false, data: 'error data not inserted..' })
    else cb(err, { success: true, data })
   }
  )
 }
}
