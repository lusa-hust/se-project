'use strict'

var express = require('express');


var ViewsController = express.Router();

ViewsController.get('/', function (req, res) {
    res.render('home/index.jade');
});

ViewsController.get('/login', function (req, res) {
  res.render('login/login.jade');
});

ViewsController.get('/signup', function (req, res) {
  res.render('signup/signup.jade');
});

module.exports = ViewsController;
