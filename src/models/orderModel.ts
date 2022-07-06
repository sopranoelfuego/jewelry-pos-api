import Connection from '../utils/dbConnect'
import { CreateOrder, Order } from '../utils/types'

export default class userModel {
 getAll(cb: Function): any {
  const qry = 'select * from orders order by id desc'
  Connection.query(qry, (err: Error | null, data: [Order]) => {
   cb(err, { success: true, data })
  })
 }
 avalaibleProducts(productId: number, qty: number, cb: Function): any {
  const qry = `select * from product where id=${productId} and qty>=${qty} `
  Connection.query(
   qry,
   [productId, qty],
   (err: Error | null, data: [Object]) => {
    console.log('data from orderModels:', data)
    cb(err, { success: true, data })
   }
  )
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

  const query1 = `insert into orders set ?`
  const query2 = `insert into orderDetails(orderNumber,productId,qty,unityPrice) values ?`
  const query3 = `select @totalSum:=sum(total) from orderDetails  where orderNumber=?`
  const query4 = `update orders set subtotal=@totalSum where orderNumber=?`
  let MajorError = {}
  Connection.beginTransaction(function (err) {
   if (err) {
    // throw err
    MajorError = err

    // cb(err, { success: false, message: err.mess})
   }
   Connection.query(query1, [newData], function (err: Error | null, data) {
    if (err) {
     Connection.rollback(function () {
      //   throw err
      MajorError = err
     })
    }
   })
   let detailsArray = []
   for (var i = 0; i < newRecord.details.length; i++) {
    let { productId, qty, unityPrice } = newRecord.details[i]
    detailsArray.push([orderNumber, productId, qty, unityPrice])
   }
   Connection.query(query2, [detailsArray], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      //   throw err
      MajorError = err
     })
    }
   })
   Connection.query(query3, [orderNumber], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      //   throw err

      MajorError = err
     })
    }
   })

   Connection.query(query4, [orderNumber], function (err, result) {
    if (err) {
     Connection.rollback(function () {
      //   throw err

      MajorError = err
     })
    }
    Connection.commit(function (err) {
     if (err) {
      Connection.rollback(function () {
       //    throw err
       MajorError = err
      })
      console.log('error in rollback', err)
      cb(MajorError, { success: false, data: err.message })
     } else cb(err, { success: true, data: 'created successfull..' })
    })
   })
  })
 }
 getById(id: Order['id'], cb: Function) {
  const qry = 'select * from orders where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [Order]) => {
   cb(err, { success: true, data })
  })
 }
 getByOrderNumber(orderNumber: Order['orderNumber'], cb: Function) {
  const qry =
   'SELECT ord.orderNumber,ord.orderTime,ord.subtotal total,prod.name product,ordDetail.unityPrice unityPrice,ordDetail.qty quantity,ordDetail.total subtotal,prod.description description  from orders ord,orderDetails ordDetail ,product prod where ordDetail.productId=prod.id and ordDetail.orderNumber=ord.orderNumber and ord.orderNumber=?'
  Connection.query(qry, [orderNumber], (err: Error | null, data: Order[]) => {
   cb(err, { success: true, data })
  })
 }
}
