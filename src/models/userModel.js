// import { query } from 'express'
import Connection from '../utils/dbConnect.js'

export default class userModel {
 getAll(cb) {
  const qry = 'select * from user order by id desc'
  Connection.query(qry, (err, data) => {
   cb(err, { success: true, data })
  })
 }
 create(newData, cb) {
  const qry = 'insert into user set ?'

  Connection.query(qry, [newData], (err, data) => {
   cb(err, { success: true, data })
  })
 }
 getById(id, cb) {
  const qry = 'select * from user where id=?'
  Connection.query(qry, [id], (err, data) => {
   cb(err, { success: true, data })
  })
 }
}
