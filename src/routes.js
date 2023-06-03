const { addcontentHandler, getAllcontentsHandler, getcontentByIdHandler, editcontentByIdHandler, deletecontentByIdHandler } = require('./gender-equality-handler')
const { addtwicontentHandler, getAlltwicontentsHandler, gettwicontentByIdHandler, edittwicontentByIdHandler, deletetwicontentByIdHandler } = require('./twi-handler')
const { addtrendingcontentHandler, getAlltrendingcontentsHandler, gettrendingcontentByIdHandler, edittrendingcontentByIdHandler, deletetrendingcontentByIdHandler } = require('./trending-handler')

const routes = [
  {
    method: 'POST',
    path: '/gecontents',
    handler: addcontentHandler
  },
  {
    method: 'GET',
    path: '/gecontents',
    handler: getAllcontentsHandler
  },
  {
    method: 'GET',
    path: '/gecontents/{id}',
    handler: getcontentByIdHandler
  },
  {
    method: 'PUT',
    path: '/gecontents/{id}',
    handler: editcontentByIdHandler
  },
  {
    method: 'DELETE',
    path: '/gecontents/{id}',
    handler: deletecontentByIdHandler
  },

  {
    method: 'POST',
    path: '/twicontents',
    handler: addtwicontentHandler
  },
  {
    method: 'GET',
    path: '/twicontents',
    handler: getAlltwicontentsHandler
  },
  {
    method: 'GET',
    path: '/twicontents/{id}',
    handler: gettwicontentByIdHandler
  },
  {
    method: 'PUT',
    path: '/twicontents/{id}',
    handler: edittwicontentByIdHandler
  },
  {
    method: 'DELETE',
    path: '/twicontents/{id}',
    handler: deletetwicontentByIdHandler
  },

  {
    method: 'POST',
    path: '/trendingcontents',
    handler: addtrendingcontentHandler
  },
  {
    method: 'GET',
    path: '/trendingcontents',
    handler: getAlltrendingcontentsHandler
  },
  {
    method: 'GET',
    path: '/trendingcontents/{id}',
    handler: gettrendingcontentByIdHandler
  },
  {
    method: 'PUT',
    path: '/trendingcontents/{id}',
    handler: edittrendingcontentByIdHandler
  },
  {
    method: 'DELETE',
    path: '/trendingcontents/{id}',
    handler: deletetrendingcontentByIdHandler
  }
]

module.exports = routes
