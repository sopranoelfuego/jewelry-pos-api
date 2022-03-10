import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './utils/dbConnect'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'

dotenv.config()
dbConnect
const app = express()
// middlware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server ready and  run on port ${port}`))
