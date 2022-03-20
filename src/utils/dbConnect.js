import mysql from 'mysql'

const con = {
 user: 'root',
 password: '',
 database: 'jewelry',
 //  connectionLimit: 99,
 //  queueLimit: 0,
 waitForConnection: true,
}

const dbConnect = mysql.createConnection(con)
dbConnect.connect(function (err) {
 if (err) throw new Error(err)
 console.log('db connect successufull..')
})
export default dbConnect
