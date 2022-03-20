import asyncHandler from 'express-async-handler'
import OrderDetailModel from '../models/orderDetailsModel.js'

// import { User } from '../utils/types'

//HERE MUST BE A GROUP OF ORDERDETAILS THEN SUBMIT ALL OF THEM ONE BY ONE
export const create = asyncHandler(async (req, res, next) => {
 let model = new OrderDetailModel()
 console.log('req.body:', req.body)
 model.create(req.body, (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})

export const getAll = asyncHandler(async (__, res, next) => {
 let model = new OrderDetailModel()
 model.getAll((err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
export const getById = asyncHandler(async (req, res, next) => {
 let model = new OrderDetailModel()
 model.getById(parseInt(req.params.id), (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
