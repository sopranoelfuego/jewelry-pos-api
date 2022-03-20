import Connection from '../utils/dbConnect.js'
// import { CreateProduct, Product, User } from '../utils/types'

export default class userModel {
 getAll(cb) {
  const qry = 'select * from product order by id desc'
  Connection.query(qry, (err, data) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord, cb) {
  const qry = 'insert into product set ?'

  Connection.query(qry, [newRecord], (err, data) => {
   cb(err, { success: true, data })
  })
 }
 getById(id, cb) {
  const qry = 'select * from product where id=?'
  Connection.query(qry, [id], (err, data) => {
   cb(err, { success: true, data })
  })
 }
}
