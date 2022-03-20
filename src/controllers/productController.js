import asyncHandler from 'express-async-handler'
import ProductModel from '../models/productModel.js'
// import { User } from '../utils/types'
// import { User } from '../utils/types'

export const create = asyncHandler(async (req, res, next) => {
 let model = new ProductModel()
 model.create(req.body, (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})

export const getAll = asyncHandler(async (req, res, next) => {
 let model = new ProductModel()
 model.getAll((err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
export const getById = asyncHandler(async (req, res, next) => {
 let model = new ProductModel()
 console.log('id here', req.params.id)
 model.getById(parseInt(req.params.id), (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
