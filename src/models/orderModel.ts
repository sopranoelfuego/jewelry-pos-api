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
  let orderNumber = nanoid()
  const newData = { ...newRecord.order, orderNumber }

  //   console.log('detailsArray', detailsArray)
  let trans = `start transaction;
     insert into orderDetails set ?
     select @totalSum:=sum(orDetai.total) from product prod,orderDetails orDetai where orDetai.productId=prod.id and orDetai.orderId=?
     update order set subtotal=@totalSum where id=?
     COMMIT;
    `

  Connection.query(qry, [newData], (err: Error | null, data) => {
   if (!data.insertId) {
    cb(err, { success: false, message: 'sorry order not executed..' })
   }
   let detailsArray = []

   for (var i = 0; i < newRecord.details.length; i++) {
    let { productId, qty, total } = newRecord.details[i]
    detailsArray.push([data.insertId, productId, qty, total])
   }
   Connection.query(
    trans,
    [detailsArray, data.insertId, data.insertId],
    (err: Error | null, data) => {
     cb(err, { success: true, data })
    }
   )
  })
 }
 getById(id: Order['id'], cb: Function) {
  const qry = 'select * from orders where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
