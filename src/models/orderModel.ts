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
  let orderNumber =
   `${new Date().getFullYear()}` +
   `${new Date().getMonth() + 1}` +
   `${new Date().getDate()}` +
   `${new Date().getSeconds()}` +
   `${new Date().getMilliseconds()}`
  const newData = { ...newRecord.order, orderNumber }

  //   console.log('detailsArray', detailsArray)
  let trans = `
   set delimiter //;
  start transaction;
     insert into orders set ?
     insert into orderDetails set ?
     select @totalSum:=sum(total) from orderDetails  where orderNumber=?
     update orders set subtotal=@totalSum where orderNumber=?
     COMMIT;
     set delimiter ;
    `

  // Connection.query(
  //  trans,
  //  [newData, detailsArray, orderNumber, orderNumber],
  //  (err: Error | null, data) => {
  //   if (!data) {
  //    err && console.log('err.message', err.message)
  //   }
  //   cb(err, { success: false, data })
  //  }
  // )
  const query1 = `insert into orders set ?`
  const query2 = `insert into orderDetails set ?`
  const query3 = `select @totalSum:=sum(total) from orderDetails  where orderNumber=?`
  const query4 = `update orders set subtotal=@totalSum where orderNumber=?`

  Connection.beginTransaction(function (err) {
   if (err) {
    throw err
   }
   Connection.query(query1, [newData], function (err: Error | null, data) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
   })
   let detailsArray = []
   for (var i = 0; i < newRecord.details.length; i++) {
    let { productId, qty, unityPrice } = newRecord.details[i]
    detailsArray.push([orderNumber, productId, qty, unityPrice, 0])
   }
   Connection.query(query2, [detailsArray], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
   })
   Connection.query(query3, [orderNumber], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
   })

   Connection.query(query4, [orderNumber], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
   })

   Connection.commit(function (err) {
    if (err) {
     Connection.rollback(function () {
      throw err
     })
    }
    console.log('success!')
    cb(err, { success: true, data: 'created successfull..' })
   })
  })
 }
 getById(id: Order['id'], cb: Function) {
  const qry = 'select * from orders where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
