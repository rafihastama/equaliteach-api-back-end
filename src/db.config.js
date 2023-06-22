const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 6020,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  url: process.env.DB_URL
})

pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error Connecting to The Database:', error)
    return
  }
  console.log('Connected to the database')
})

module.exports = pool
