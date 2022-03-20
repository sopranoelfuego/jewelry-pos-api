import Connection from '../utils/dbConnect.js'

export default class OrderDetailModel {
 getAll(cb) {
  const qry = 'select * from orderDetails  order by id desc'
  Connection.query(qry, (err, data) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord, cb) {
  const qry = 'insert into orderDetails set ?'
  const verifRequest = `select * from product where id=? and qty>=? and qty>0 `
  Connection.query(
   verifRequest,
   [newRecord.productId, newRecord.qty],
   (err, data) => {
    if (!data[0])
     cb(err, {
      success: false,
      message: 'such quantity of products is available',
     })
    Connection.query(qry, [newRecord], (err, data) => {
     cb(err, { success: true, data })
    })
   }
  )
 }
 getById(id, cb) {
  const qry = 'select * from orderDetails where id=? '
  Connection.query(qry, [id], (err, data) => {
   cb(err, { success: true, data })
  })
 }
}
