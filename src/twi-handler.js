const { nanoid } = require('nanoid')
const mysql = require('mysql')
const connection = mysql.createConnection({
  MYSQLHOST: 'localhost',
  MYSQLUSER: 'root',
  MYSQLPASSWORD: '',
  MYSQLDATABASE: 'railway'
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error)
    return
  }
  console.log('Connected to the database')
})

const addtwicontentHandler = (request, h) => {
  const { name, description, image } = request.payload
  const id = nanoid(16)
  const newcontent = { id, name, description, image }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Konten. Mohon isi nama Konten'
    })
    response.code(400)
    return response
  }

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO twi SET ?', newcontent, (error, results) => {
      if (error) {
        console.error('Error inserting content into the database:', error)
        const response = h.response({
          status: 'fail',
          message: 'Konten gagal ditambahkan'
        })
        response.code(500)
        reject(response) // Reject the promise with the error response
      } else {
        const response = h.response({
          status: 'success',
          message: 'Konten berhasil ditambahkan',
          content: newcontent
        })
        response.code(201)
        resolve(response) // Resolve the promise with the success response
      }
    })
  }).catch((errorResponse) => {
    return errorResponse
  })
}

const getAlltwicontentsHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM twi', (error, results) => {
      if (error) {
        console.error('Error retrieving contents from the database:', error)
        const response = h.response({
          status: 'fail',
          message: 'Gagal mengambil Konten'
        })
        response.code(500)
        reject(response)
      }

      const response = h.response({
        status: 'success',
        contents: results
      })
      response.code(200)
      resolve(response)
    })
  })
}

const gettwicontentByIdHandler = (request, h) => {
  const { id } = request.params

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM twi WHERE id = ?', id, (error, results) => {
      if (error) {
        console.error('Error retrieving content from the database:', error)
        const response = h.response({
          status: 'fail',
          message: 'Gagal mengambil Konten'
        })
        response.code(500)
        reject(response)
      } else if (results.length > 0) {
        const content = results[0]
        const response = h.response({
          status: 'success',
          content
        })
        response.code(200)
        resolve(response)
      } else {
        const response = h.response({
          status: 'fail',
          message: 'Konten tidak ditemukan'
        })
        response.code(404)
        resolve(response)
      }
    })
  }).catch((errorResponse) => {
    return errorResponse
  })
}

const edittwicontentByIdHandler = (request, h) => {
  const { id } = request.params
  const { name, description, image } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Konten. Mohon isi nama Konten'
    })
    response.code(400)
    return response
  }

  const updatedContent = {
    name,
    description,
    image
  }

  return new Promise((resolve, reject) => {
    connection.query('UPDATE twi SET ? WHERE id = ?', [updatedContent, id], (error, results) => {
      if (error) {
        console.error('Error updating content in the database:', error)
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui Konten'
        })
        response.code(500)
        reject(response) // Reject the promise with the error response
      } else if (results.affectedRows > 0) {
        const response = h.response({
          status: 'success',
          message: 'Konten berhasil diperbarui'
        })
        response.code(200)
        resolve(response) // Resolve the promise with the success response
      } else {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui Konten. Id tidak ditemukan'
        })
        response.code(404)
        resolve(response) // Resolve the promise with the not found response
      }
    })
  }).catch((errorResponse) => {
    return errorResponse
  })
}

const deletetwicontentByIdHandler = (request, h) => {
  const { id } = request.params

  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM twi WHERE id = ?', id, (error, results) => {
      if (error) {
        console.error('Error deleting content from the database:', error)
        const response = h.response({
          status: 'fail',
          message: 'Gagal menghapus Konten'
        })
        response.code(500)
        reject(response) // Reject the promise with the error response
      } else if (results.affectedRows > 0) {
        const response = h.response({
          status: 'success',
          message: 'Konten berhasil dihapus'
        })
        response.code(200)
        resolve(response) // Resolve the promise with the success response
      } else {
        const response = h.response({
          status: 'fail',
          message: 'Konten gagal dihapus. Id tidak ditemukan'
        })
        response.code(404)
        resolve(response) // Resolve the promise with the not found response
      }
    })
  }).catch((errorResponse) => {
    return errorResponse
  })
}

module.exports = {
  addtwicontentHandler,
  getAlltwicontentsHandler,
  gettwicontentByIdHandler,
  edittwicontentByIdHandler,
  deletetwicontentByIdHandler
}
