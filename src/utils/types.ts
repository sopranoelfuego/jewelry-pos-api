import { Options } from 'nodemailer/lib/mailer'

export interface User extends CreateUser {
 id?: number
 location?: Location
 post?: Post
 profile?: Profil
 active: string
 code: string

 passwordToken?: string
 resetPasswordToken_expire?: string
}
export interface CreateUser {
 userName: string
 firstName: string
 lastName: string
 email: string
 password: string
 profilePicture?: string
 locationId: number
 addresse: string
 phoneNumber: string
 tokenVersion: number
 postId: number
 code?: string
 active?: string
 codeExpireTime?: number
 profileId: number
}
export interface Product {
 id: number
 name: string
 description: string
 qty: number
 categoryId: number
 category?: Category
 supplierId: number
 supplier?: Supplier
 price: number
 barCode?: number
}
export interface CreateProduct {
 name: string
 description: string
 categoryId: number
 supplierId: number
 price: number
 qty: number
 barCode?: string
}
export interface Order {
 id: number
 orderNumber: string
 costumer: string
 employeId: number
 employe?: User
 status: number
 subtotal: number
 payment: string
 orderTime: string
 orderMonth: number
 orderYear: number
 orderDay: number
 createdAt: Date
 updatedAt: Date
}
export interface CreateOrder {
 //  costumer: string
 //  employeId: number
 //  status: number
 //  subtotal: number
 //  payment: string
 order: {
  costumer: string
  employeId: number
  status: number
  subtotal?: number
  payment: string
 }
 details: [CreateOrderDetail]
}
export interface OrderDetail {
 id: number
 orderId: number
 order?: Order
 productId: number
 product?: Product
 price: number
 qty: number
 total: number
}
export interface CreateOrderDetail {
 orderNumber: string
 productId: number
 price: number
 qty: number
 unityPrice: number
 total?: number
}
export interface Location {
 id?: number
 province: string
 city: string
}

export interface Profil {
 id?: number
 name: string
 description: string
}
export interface Post {
 id?: number
 name: string
 description: string
}
export interface Category {
 id?: number
 name: string
 description: string
}
export interface Supplier {
 id?: number
 campanyName: string
 location: Location
 phoneNumber: string
 addresse: string
}

export interface IOrderResponce {
 success: boolean
 data: IOrderDetailed[]
}
export interface IUserResponse {
 success: boolean
 data: User[]
}
export interface IOrderDetailed {
 orderNumber: string
 orderTime: string
 total: number
 product: string
 unityPrice: number
 quantity: number
 subtotal: number
 description: string
}
export interface IGeneralResponse {
 success: boolean
 data: Object
}
export interface ISession {
 sessionId: string
 email: string
 valid: string
 userName: string
}
export interface IAccessToken {
 email: string
}
export interface IRefreshToken extends IAccessToken {
 tokenVersion: number
 exp?: number
 iat?: number
}
export interface IMailerOptions extends Options {}
