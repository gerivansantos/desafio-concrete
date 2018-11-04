const express = require('express');
const path = require('path');
const config = require(path.resolve('src/utils/config'));
const bodyParser = require('body-parser');
const userController = require(path.resolve('src/controller/userController'));

/* App Configuration */
const app = express();
app.set('port', config.server.port);
app.set('title', config.app.name);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Endpoint Criar Usuário
app.post('/createUser' , function(req, res) {
    userController.create(req, res);
  });

//Endpoint Sign in
app.post('/signin' , function(req, res) {
    userController.signIn(req, res);
});

//Endpoint getUser
app.get('/getUser/:id' , function(req, res) {
  userController.getUser(req, res);
});

  /*DEFAULT ROUTE*/
app.get('*' , function(req, res) {  
    res.status(404).json(config.message.DEFAULT_ERROR);
  });

module.exports = app;