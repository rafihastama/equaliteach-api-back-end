const twicontents = require('./twi-contents')
const { nanoid } = require('nanoid')

const addtwicontentHandler = (request, h) => {
  const { name, description, image } = request.payload

  const id = nanoid(16)

  const newtwicontent = {
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

  twicontents.push(newtwicontent)

  const isSuccess = twicontents.filter((twicontent) => twicontent.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Konten berhasil ditambahkan',
      twicontents
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

const getAlltwicontentsHandler = () => ({
  status: 'success',
  twicontents
})

const gettwicontentByIdHandler = (request, h) => {
  const { id } = request.params

  const twicontent = twicontents.filter((b) => b.id === id)[0]

  if (twicontent !== undefined) {
    return {
      status: 'success',
      twicontent
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Konten tidak ditemukan'
  })
  response.code(404)
  return response
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

  const index = twicontents.findIndex((twicontent) => twicontent.id === id)

  if (index !== -1) {
    twicontents[index] = {
      ...twicontents[index],
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

const deletetwicontentByIdHandler = (request, h) => {
  const { id } = request.params

  const index = twicontents.findIndex((twicontent) => twicontent.id === id)

  if (index !== -1) {
    twicontents.splice(index, 1)
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
  addtwicontentHandler,
  getAlltwicontentsHandler,
  gettwicontentByIdHandler,
  edittwicontentByIdHandler,
  deletetwicontentByIdHandler
}
