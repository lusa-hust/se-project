'use strict'

var express = require('express');


var ViewsController = express.Router();

ViewsController.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://52.36.12.106");
    res.render('index.jade');
});

module.exports = ViewsController;
