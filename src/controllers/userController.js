import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'
// import { User } from '../utils/types'
// import { User } from '../utils/types'

export const create = asyncHandler(async (req, res, next) => {
 let user = new UserModel()
 user.create(req.body, (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})

export const getAll = asyncHandler(async (req, res, next) => {
 let user = new UserModel()
 user.getAll((err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
export const getById = asyncHandler(async (req, res, next) => {
 let user = new UserModel()
 console.log('id here', req.params.id)
 user.getById(parseInt(req.params.id), (err, doc) => {
  if (err) return next(new Error(err.message))
  res.json(doc)
 })
})
