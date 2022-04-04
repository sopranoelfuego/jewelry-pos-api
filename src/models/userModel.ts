// import { query } from 'express'
import Connection from '../utils/dbConnect'
import { CreateProduct, User, CreateUser } from '../utils/types'

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
}
