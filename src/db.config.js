const mysql = require('mysql')

const connection = mysql.createPool({
  MYSQLHOST: 'containers-us-west-107.railway.app',
  MYSQLUSER: 'root',
  MYSQLPASSWORD: 'YX2gWv2bVXnAtDGCjQrq',
  MYSQLDATABASE: 'railway',
  MYSQLPORT: 5880,
  MYSQL_URL: 'mysql://root:YX2gWv2bVXnAtDGCjQrq@containers-us-west-107.railway.app:5880/railway'
})

module.exports = connection
