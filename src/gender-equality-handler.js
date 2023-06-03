const contents = require('./contents')
const { nanoid } = require('nanoid')

const addcontentHandler = (request, h) => {
  const { name, description, image } = request.payload

  const id = nanoid(16)

  const newcontent = {
    id, name, description, image
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan Konten. Mohon isi nama Konten'
    })
    response.code(400)
    return response
  }

  contents.push(newcontent)

  const isSuccess = contents.filter((content) => content.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Konten berhasil ditambahkan',
      contents
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Konten gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllcontentsHandler = () => ({
  status: 'success',
  contents
})

const getcontentByIdHandler = (request, h) => {
  const { id } = request.params

  const content = contents.filter((b) => b.id === id)[0]

  if (content !== undefined) {
    return {
      status: 'success',
      content
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Konten tidak ditemukan'
  })
  response.code(404)
  return response
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

  const index = contents.findIndex((content) => content.id === id)

  if (index !== -1) {
    contents[index] = {
      ...contents[index],
      name,
      description,
      image
    }
    const response = h.response({
      status: 'success',
      message: 'Konten berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Konten. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deletecontentByIdHandler = (request, h) => {
  const { id } = request.params

  const index = contents.findIndex((content) => content.id === id)

  if (index !== -1) {
    contents.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Konten berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Konten gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addcontentHandler,
  getAllcontentsHandler,
  getcontentByIdHandler,
  editcontentByIdHandler,
  deletecontentByIdHandler
}
