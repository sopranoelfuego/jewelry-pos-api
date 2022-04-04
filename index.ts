import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './src/utils/dbConnect'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
import productRoutes from './src/routes/productRoutes'
import orderRoutes from './src/routes/orderRoutes'
import orderDetails from './src/routes/orderDetailRoutes'
import cookieParser from 'cookie-parser'
import authMiddleware from './src/middleware/authMiddleware'
dotenv.config()
dbConnect
const app = express()
// middlware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('uploads'))
// app.use(authMiddleware)
// Routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/orderdetail', orderDetails)
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server ready and  run on port ${port}`))
