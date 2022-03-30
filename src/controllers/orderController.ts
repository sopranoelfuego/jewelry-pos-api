import { Response, Request, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel'

// import { User } from '../utils/types'
import niceInvoice from 'nice-invoice'
import { IOrderResponce } from '../utils/types'
export const create = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  console.log('req.body', req.body)
  model.create(req.body, (err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)

export const getAll = asyncHandler(
 async (__, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getAll((err: Error | null, doc: Object) => {
   if (err) return next(new Error(err.message))
   res.json(doc)
  })
 }
)
export const getById = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getById(
   parseInt(req.params.id),
   (err: Error | null, doc: IOrderResponce) => {
    if (err) return next(new Error(err.message))
    res.json(doc)
   }
  )
 }
)
export const getInvoiceBill = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let model = new OrderModel()
  model.getByOrderNumber(
   req.params.orderNumber,
   (err: Error | null, doc: IOrderResponce) => {
    if (err) return next(new Error(err.message))
    let { data } = doc
    const itmesGot = data.map(d => ({
     item: d['product'],
     description: d['description'],
     quantity: d['quantity'],
     price: d['unityPrice'],
     tax: '0%',
    }))
    const invoiceDetail = {
     shipping: {
      name: 'caporal',
      address: '1234 Main Street',
      city: 'Kanyosha',
      state: 'Bujumbura',
      country: 'BURUNDI',
      postal_code: 94111,
     },
     items: itmesGot,
     subtotal: doc.data[0].total,
     total: doc.data[0].total,
     order_number: doc.data[0].orderNumber,
     header: {
      company_name: 'ISardine Nindagara',
      company_logo: './uploads/logo.png',
      company_address:
       'Nice Invoice. 123 William Street 1th Floor New York, NY 123456',
     },
     footer: {
      text: 'Your satisfaction is our Pride...',
     },
     currency_symbol: 'BIF',
     date: {
      billing_date:
       new Date().getDate() +
       '-' +
       new Date().getMonth() +
       1 +
       '-' +
       new Date().getFullYear(),
      due_date:
       new Date().getDate() +
       '-' +
       new Date().getMonth() +
       1 +
       '-' +
       new Date().getFullYear(),
     },
    }
    //   niceInvoice(invoiceDetail, 'your-invoice-name.pdf');
    //   console.log('invoiceDetail', invoiceDetail)

    niceInvoice(invoiceDetail, `./uploads/${doc.data[0].orderNumber}.pdf`)

    res.json(doc)
   }
  )
 }
)
