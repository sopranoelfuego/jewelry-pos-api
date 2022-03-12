import { nanoid } from 'nanoid'
import Connection from '../utils/dbConnect'
import { CreateOrder, Order, User } from '../utils/types'

export default class orderModel {
 getAll(cb: Function): any {
  const qry = 'select * from orders order by id desc'
  Connection.query(qry, (err: Error | null, data: [Order]) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord: CreateOrder, cb: Function) {
  const qry = 'insert into orders set ?'

  const detailsTrans =
   'insert into orderDetails(orderId, productId, qty, total) values ?'
  const getSumForOrder =
   'select sum(orDetai.total) total from product prod,orderDetails orDetai where orDetai.productId=prod.id and orDetai.orderId=?'
  const updateTotalOrder = 'update orders set subtotal=? where id=?'
  let orderNumber = nanoid()
  const newData = { ...newRecord.order, orderNumber }

  //   console.log('detailsArray', detailsArray)
  let trans = `start transaction
     insert into orderDetails(orderId,productId, qty,total) values ?
     select @totalSum:=sum(orDetai.total) from product prod,orderDetails orDetai where orDetai.productId=prod.id and orDetai.orderId=?
     update order set subtotal=@totalSum where id=?
     COMMIT
    `
  Connection.beginTransaction((err: Error) => {
   if (err) throw err
   Connection.query(qry, [newData], (err: Error | null, data) => {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }

    let detailsArray = []

    for (var i = 0; i < newRecord?.details.length; i++) {
     let { productId, qty, total } = newRecord.details[i]

     detailsArray.push([data.insertId, productId, qty, total])
    }
    console.log('detailsArray', detailsArray)
    Connection.query(
     detailsTrans,
     [detailsArray],
     (err: Error | null, data1) => {
      if (err) {
       Connection.rollback(function () {
        throw err
       })
      }
      // data[0].total
     }
    )
    Connection.query(
     getSumForOrder,
     [data.insertId],
     (err: Error | null, data1) => {
      if (err) {
       Connection.rollback(function () {
        throw err
       })
      }
      Connection.query(
       updateTotalOrder,
       [data1[0].total, data.insertId],
       (err: Error | null, data2) => {
        if (err) {
         Connection.rollback(function () {
          throw err
         })
        }
       }
      )
     }
    )
   })
   Connection.commit(function (err) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
    cb(err, { success: true, data: 'successfull created...' })
    console.log('Transaction Complete.')
   })
  })

  // Connection.query(qry, [newData], (err: Error | null, data) => {
  //  if (!data.insertId) {
  //   cb(err, { success: false, message: 'sorry order not executed..' })
  //  }
  //  let detailsArray = []

  //  for (var i = 0; i < newRecord.details.length; i++) {
  //   let { productId, qty, total } = newRecord.details[i]
  //   detailsArray.push([data.insertId, productId, qty, total])
  //  }
  //  Connection.query(
  //   trans,
  //   [detailsArray, data.insertId, data.insertId],
  //   (err: Error | null, data) => {
  //    cb(err, { success: true, data })
  //   }
  //  )
  // })
 }
 getById(id: Order['id'], cb: Function) {
  const qry = 'select * from orders where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
