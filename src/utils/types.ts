export interface User {
 id?: number
 userName: string
 firstName: string
 lastName: string
 email: string
 profilePicture?: string
 locationId: string
 location?: Location
 addresse: string
 phoneNumber: string
 postId: string
 post?: Post
 profileId: string
 profile?: Profil
 passwordToken?: string
 resetPasswordToken_expire?: string
}
export interface CreateUser {
 userName: string
 firstName: string
 lastName: string
 email: string
 profilePicture?: string
 locationId: string
 addresse: string
 phoneNumber: string
 postId: number
 profileId: number
}
export interface Product {
 id: string
 name: string
 description: string
 category: Category
 supplier: Supplier
 price: number
 barCode?: number
}
export interface Order {
 id: string
 orderNumber: string
 costumer: string
 employe: User
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
export interface OrderDetail {
 id: string
 order: Order
 product: Product
 price: number
 qty: number
 total: number
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
