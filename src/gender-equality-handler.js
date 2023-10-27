const { nanoid } = require('nanoid')
const pool = require('./db.config')

const addcontentHandler = (request, h) => {
  const { name, description, image } = request.payload
  const id = nanoid(16)
  const newcontent = { id, name, description, image }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Konten. Mohon isi nama konten'
    })
    response.code(400)
    return response
  }

  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO gender_equality SET ?', newcontent, (error, results) => {
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

const getAllcontentsHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM gender_equality', (error, results) => {
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

const getcontentByIdHandler = (request, h) => {
  const { id } = request.params

  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM gender_equality WHERE id = ?', id, (error, results) => {
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

const editcontentByIdHandler = (request, h) => {
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
    pool.query('UPDATE gender_equality SET ? WHERE id = ?', [updatedContent, id], (error, results) => {
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

const deletecontentByIdHandler = (request, h) => {
  const { id } = request.params

  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM gender_equality WHERE id = ?', id, (error, results) => {
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
  addcontentHandler,
  getAllcontentsHandler,
  getcontentByIdHandler,
  editcontentByIdHandler,
  deletecontentByIdHandler
}
