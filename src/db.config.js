const mysql = require('mysql')

const connection = mysql.createConnection({
  MYSQLHOST: 'containers-us-west-107.railway.app',
  MYSQLUSER: 'root',
  MYSQLPASSWORD: 'YX2gWv2bVXnAtDGCjQrq',
  MYSQLDATABASE: 'railway',
  MYSQLPORT: 5880,
  MYSQL_URL: 'mysql://root:YX2gWv2bVXnAtDGCjQrq@containers-us-west-107.railway.app:5880/railway'
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error)
    return
  }
  console.log('Connected to the database')
})

module.exports = connection
