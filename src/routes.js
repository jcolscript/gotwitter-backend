const express = require('express');

const routes = express.Router();
const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

//usuarios
routes.post('/user/register', UserController.store);

//autenticação
routes.post('/auth/login', LoginController.index);

//listar e criar tweets
routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);

//curtir tweets
routes.post('/likes/:id', LikeController.store);


module.exports = routes;