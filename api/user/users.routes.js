const controller = require('./users.controller');

module.exports =  (router) {
  router.post('/users/create', controller.createUser)
  router.get('/users', controller.fetch)
  router.get('/users/:email', controller.fetchUser)
  router.put('/users/:id', controller.updateUser)
  router.delete('/users/:id',controller.deleteUser)
};
