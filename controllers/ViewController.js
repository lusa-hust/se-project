'use strict'

var express = require('express');


var ViewsController = express.Router();

ViewsController.get('/', function (req, res) {
    res.render('index.jade');
});

module.exports = ViewsController;
