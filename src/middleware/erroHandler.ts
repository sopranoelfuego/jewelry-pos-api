import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
 const error = new Error(`Not Found - ${req.originalUrl}`)
 res.status(404)
 next(error)
}
export const errorHandler = (
 err: ErrorRequestHandler,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const statusCode = res.statusCode === 200 ? 500 : res.statusCode
 console.log('errorHandler:', err)
 res.status(statusCode)
 res.json({
  success: false,
  message: err,
  stack: process.env.NODE_ENV === 'production' ? null : err,
 })
}
