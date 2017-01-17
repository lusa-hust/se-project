/**
 * Created by samhv on 11/28/16.
 */
'use strict'

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db = require('./models/db');

// setting views and public folder
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use('/static/', express.static(__dirname + '/public'))

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 3000;        // set our port

// add Controller


app.use('/api', require('./controllers/RestfulController'));

app.use('/api', require('./controllers/UsersRestController'));
app.use('/api/auth', require('./controllers/AuthController'));

app.use('/api', require('./controller/TrackingListRestController'));

app.use('/', require('./controllers/ViewController'));

// start
app.listen(port);
console.log('Dict in on port ' + port);
