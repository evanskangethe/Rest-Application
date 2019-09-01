const controller = require('./users.controller');
const fs = require('fs');
const jwt = require('express-jwt');
const public_key = fs.readFileSync('../../keys/public.key');

module.exports =  (router) =>{
  router.post('/users/create',jwt({secret: public_key}), controller.createUser)
  router.get('/users', jwt({secret: public_key}),controller.fetch)
  router.post('/user', controller.fetchUser)
  router.put('/users/:id',jwt({secret: public_key}), controller.updateUser)
  router.delete('/users/:id',jwt({secret: public_key}),controller.deleteUser)
};
