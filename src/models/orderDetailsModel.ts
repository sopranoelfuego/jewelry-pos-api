import Connection from '../utils/dbConnect'
import { CreateOrderDetail, OrderDetail } from '../utils/types'

export default class OrderDetailModel {
 getAll(cb: Function): any {
  const qry = 'select * from orderDetails  order by id desc'
  Connection.query(qry, (err: Error | null, data: [OrderDetail]) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord: CreateOrderDetail, cb: Function) {
  const qry = 'insert into orderDetails set ?'
  const verifRequest = `select * from product where id=${newRecord.productId} and qty>=${newRecord.qty} and qty<>0 `
  Connection.query(verifRequest, (err: Error | null, data: Object) => {
   cb(err, { success: true, data })
  })
 }
 getById(id: OrderDetail['id'], cb: Function) {
  const qry = 'select * from orderDetails where id=? '
  Connection.query(qry, [id], (err: Error | null, data: [OrderDetail]) => {
   cb(err, { success: true, data })
  })
 }
}
