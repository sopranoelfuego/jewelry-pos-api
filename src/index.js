import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './utils/dbConnect.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import orderDetails from './routes/orderDetailRoutes.js'
import { getInvoice } from './controllers/orderController.js'

dotenv.config()
dbConnect
const app = express()
// middlware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/orderdetail', orderDetails)
app.use('/api/invoice/:id', (req, res, next) => {
 let model = new OrderModel()
 model.getDetailedOrder(parseInt(req.params.id), (err, doc) => {
  if (err) return next(new Error(err.message))
  const items = doc?.data?.map(d => ({
   item: d?.product,
   description: d?.description,
   quantity: d?.quantity,
   price: d?.subtotal,
   country: 'BURUNDI',
   postal_code: 94111,
  }))
  //   const invoiceDetail = {
  //    shipping: {
  //     name: 'Micheal',
  //     address: '1234 Main Street',
  //     city: 'Dubai',
  //     state: 'Dubai',
  //     country: 'UAE',
  //     postal_code: 94111,
  //    },
  //    items,
  //    subtotal: doc?.data[0]?.total,
  //    total: doc?.data[0]?.total,
  //    order_number: doc?.data[0]?.orderNumber,
  //    header: {
  //     company_name: 'Jewerly Bujumbura',
  //     company_logo: 'logo.png',
  //     company_address: 'bujumbura,Burundi kanyosha 23',
  //    },
  //    footer: {
  //     text: 'merci d avoir choisi jewelry bujumbura..',
  //    },
  //    currency_symbol: 'fbu',
  //    date: {
  //     billing_date: `${new Date().getDate()}-${
  //      new Date().getMonth() + 1
  //     }-${new Date().getFullYear()}`,
  //     due_date: `${new Date().getDate()}-${
  //      new Date().getMonth() + 3
  //     }-${new Date().getFullYear()}`,
  //    },
  //   }

  const invoiceDetail = {
   shipping: {
    name: 'Micheal',
    address: '1234 Main Street',
    city: 'Dubai',
    state: 'Dubai',
    country: 'UAE',
    postal_code: 94111,
   },
   items: [
    {
     item: 'Chair',
     description: 'Wooden chair',
     quantity: 1,
     price: 50.0,
     tax: '10%',
    },
    {
     item: 'Watch',
     description: 'Wall watch for office',
     quantity: 2,
     price: 30.0,
     tax: '10%',
    },
    {
     item: 'Water Glass Set',
     description: 'Water glass set for office',
     quantity: 1,
     price: 35.0,
     tax: '',
    },
   ],
   subtotal: 156,
   total: 156,
   order_number: 1234222,
   header: {
    company_name: 'Nice Invoice',
    company_logo: 'logo.png',
    company_address:
     'Nice Invoice. 123 William Street 1th Floor New York, NY 123456',
   },
   footer: {
    text: 'This is footer - you can add any text here',
   },
   currency_symbol: '$',
   date: {
    billing_date: '08 August 2020',
    due_date: '10 September 2020',
   },
  }
  //   niceInvoice(invoiceDetail, 'your-invoice-name.pdf');
  //   console.log('invoiceDetail', invoiceDetail)
  niceInvoice(invoiceDetail, '/uploads/test.pdf')

  res.json({ message: 'hello' })
  let fileName = '/uploads/test.pdf'
  //   res.sendFile(fileName, { root: __dirname }, err => {
  //    if (err) {
  //     next(err)
  //     throw err
  //    } else {
  //     console.log('Sent:', fileName)
  //    }
  //   })
 })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server ready and  run on port ${port}`))
