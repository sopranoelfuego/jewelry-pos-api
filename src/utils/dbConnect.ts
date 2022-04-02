import mysql from 'mysql'
import { nanoid } from 'nanoid'
import { ISession } from './types'
const con = {
 user: 'root',
 password: '',
 database: 'jewelry',
 //  connectionLimit: 99,
 //  queueLimit: 0,
 waitForConnection: true,
}

const dbConnect = mysql.createConnection(con)
dbConnect.connect(function (err: string) {
 if (err) throw new Error(err)
 console.log('db connect successufull..')
})

export const createSession = (email: string, userName: string) => {
 const session = { sessionId: nanoid(), email, userName, valid: '1' }
 const qry = 'insert into sessions set ?'

 dbConnect.query(qry, [session], (err: Error | null, data) => {
  if (err) {
   throw err
  }
 })
 return session
}
export const getSession = (email: string, cb: Function) => {
 const qry = 'select * from sessions where email=?'
 let session: ISession = {
  sessionId: '',
  email: '',
  valid: '',
  userName: '',
 }
 dbConnect.query(qry, [email], (err: Error | null, doc) => {
  cb({ err, data: doc[0] })
 })
 return session
}
export default dbConnect
