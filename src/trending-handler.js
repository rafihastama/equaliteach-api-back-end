const trendingcontents = require('./trending-contents')
const { nanoid } = require('nanoid')

const addtrendingcontentHandler = (request, h) => {
  const { name, description, image } = request.payload

  const id = nanoid(16)

  const newtrendingcontent = {
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

  trendingcontents.push(newtrendingcontent)

  const isSuccess = trendingcontents.filter((trendingcontent) => trendingcontent.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Konten berhasil ditambahkan',
      trendingcontents
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

const getAlltrendingcontentsHandler = () => ({
  status: 'success',
  trendingcontents
})

const gettrendingcontentByIdHandler = (request, h) => {
  const { id } = request.params

  const trendingcontent = trendingcontents.filter((b) => b.id === id)[0]

  if (trendingcontent !== undefined) {
    return {
      status: 'success',
      trendingcontent
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Konten tidak ditemukan'
  })
  response.code(404)
  return response
}

const edittrendingcontentByIdHandler = (request, h) => {
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

  const index = trendingcontents.findIndex((trendingcontent) => trendingcontent.id === id)

  if (index !== -1) {
    trendingcontents[index] = {
      ...trendingcontents[index],
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

const deletetrendingcontentByIdHandler = (request, h) => {
  const { id } = request.params

  const index = trendingcontents.findIndex((trendingcontent) => trendingcontent.id === id)

  if (index !== -1) {
    trendingcontents.splice(index, 1)
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
  addtrendingcontentHandler,
  getAlltrendingcontentsHandler,
  gettrendingcontentByIdHandler,
  edittrendingcontentByIdHandler,
  deletetrendingcontentByIdHandler
}
