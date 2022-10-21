const userController = require('../controller/user.controller');

module.exports = (app) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.post('/logout', userController.logout);
  app.get('/api/current-user', userController.getLoggedInUser);
};