import Connection from '../utils/dbConnect'
import {
 CreateProduct,
 Product,
 User,
 ISQLResponseMutation,
} from '../utils/types'

export default class userModel {
 getAll(cb: Function): any {
  const qry = 'select * from product order by id desc'
  Connection.query(qry, (err: Error | null, data: [Product]) => {
   cb(err, { success: true, data })
  })
 }
 create(newRecord: CreateProduct, cb: Function) {
  const qry = 'insert into product set ?'

  Connection.query(
   qry,
   [newRecord],
   (err: Error | null, data: ISQLResponseMutation) => {
    if (data.insertId <= 0)
     return cb(err, {
      success: false,
      data: 'error product not created..',
     })
    else cb(err, { success: true, data })
   }
  )
 }
 getById(id: Product['id'], cb: Function) {
  const qry = 'select * from product where id=?'
  Connection.query(qry, [id], (err: Error | null, data: [User]) => {
   cb(err, { success: true, data })
  })
 }
}
