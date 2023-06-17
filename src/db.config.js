const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 6020,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  url: process.env.DB_URL
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error)
    return
  }
  console.log('Connected to the database')
})

module.exports = connection
