// import { query } from 'express'
import Connection from '../utils/dbConnect'
import { User } from '../utils/types'

export default class userModel {
 getAll(cb: Function): any {
  const qry = 'select * from user order by id desc'
  Connection.query(qry, (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
 create(newUser: User, cb: Function) {
  const qry = 'insert into user set ?'
  console.log('newUser here', newUser)
  Connection.query(qry, [newUser], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
