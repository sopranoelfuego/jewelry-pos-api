import { nanoid } from 'nanoid'
import Connection from '../utils/dbConnect'
import { CreateOrder, Order, User } from '../utils/types'

export default class userModel {
 getAll(cb: Function): any {
  const qry = 'select * from orders order by id desc'
  Connection.query(qry, (err: Error | null, data: [Order]) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord: CreateOrder, cb: Function) {
  const qry = 'insert into orders set ?'
  const newData = { ...newRecord, orderNumber: nanoid() }

  Connection.query(qry, [newData], (err: Error | null, data: Object) => {
   cb(err, { success: true, data })
  })
 }
 getById(id: Order['id'], cb: Function) {
  const qry = 'select * from orders where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
