'use strict'

var express = require('express'),
    User = require('../models/User'),
    SALT_WORK_FACTOR = 10,
    bcrypt = require('bcrypt');


var DataValidator = require('./Helper/DataValidator');
var DV = new DataValidator();

var WordList = require('../models/WordList');
var TrackingList = require('../models/TrackingList');

var AuthController = express.Router();

var loginFunction = function (req, res) {
    if (req.body.token !== undefined) {
        User.findOne({'token': req.body.token}, function (err, person) {
            if (err || person == null) {
                res.json({
                    status: false,
                    error: {
                        token: 'token not found'
                    },
                    err: err
                });
                return;
            }

            res.json({
                status: true,
                account: person
            })

        });

        return;
    }


    if (DV.emailValidator(req.body.email) == false) {
        res.json({
            status: false,
            error: "Invalid Email"
        });

        return;
    }


    User.findOne({'email': req.body.email}, function (err, person) {
        if (err || person == null) {
            res.json({
                status: false,
                error: {
                    email: 'Email Not Found'
                }
            });
            return;
        }

        person.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                // generate a salt
                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                    if (err) return next(err);

                    // hash the password along with our new salt
                    bcrypt.hash(person.email + person.password, salt, function (err, hash) {
                        if (err) return next(err);

                        // override the cleartext password with the hashed one
                        person.token = hash;
                        person.save();

                        res.json({
                            status: true,
                            account: person.toJSON(),
                            token: person.token
                        })
                    });
                });

                return;
            }

            res.json({
                status: false,
                error: {
                    password: 'password not match'
                }
            })
        });
    });
};

var signUpFunction = function (req, res) {
    var error = {};

    if (DV.nameValidator(req.body.name) == false) {
        error.name = "Invalid name";
    }

    if (DV.emailValidator(req.body.email) == false) {
        error.email = "Invalid Email";
    }

    if (Object.keys(error).length != 0) {

        res.json({
            status: false,
            error: error
        });
        return;
    }

    var newUser = new User();

    newUser.name = req.body.name;

    newUser.email = req.body.email;

    newUser.password = req.body.password;

    newUser.save(function (err, user) {
        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not create user because of database error !"
            });
            return;
        }

        res.status(201).json({
            status: true,
            message: 'User created!'
        });


        var trackList = new TrackingList();
        trackList.user_id = user._id;
        trackList.save();


        var wordList = new WordList();
        wordList.user_id = user._id;
        wordList.save();


    });


};

AuthController.post('/login', loginFunction);
AuthController.post('/signup', signUpFunction);

module.exports = AuthController;