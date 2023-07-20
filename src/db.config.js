/* eslint-disable no-undef */
const mysql = require('mysql')
const fetch = require('node-fetch')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'equaliteach.mysql.database.azure.com',
  user: 'lucius',
  password: 'Caelum666?',
  database: 'equaliteach_db',
  port: 3306,
  ssl: { ca: fs.readFileSync('{DigiCertGlobalRootG2.crt.pem}') }
})

pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error Connecting to The Database:', error)
    return
  }
  console.log('Connected to the database')
})

const keepAliveInterval = setInterval(() => {
  const endpoints = [
    'https://equaliteach-api-back-end-production-4920.up.railway.app/gecontents',
    'https://equaliteach-api-back-end-production-4920.up.railway.app/twicontents',
    'https://equaliteach-api-back-end-production-4920.up.railway.app/trendingcontents'
  ]

  endpoints.forEach(endpoint => {
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          console.log(`Keep-alive request to ${endpoint} successful`)
        } else {
          console.error(`Keep-alive request to ${endpoint} failed`)
        }
      })
      .catch(error => {
        console.error(`Error sending keep-alive request to ${endpoint}:`, error)
      })
  })
}, 4 * 60 * 60 * 1000) // 4 hours in milliseconds

process.on('SIGINT', () => {
  clearInterval(keepAliveInterval)
})

module.exports = pool
