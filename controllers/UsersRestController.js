/**
 * Created by samhv on 11/28/16.
 */

'use strict'

var express = require('express');
var User = require('../models/User');

var DataValidator = require('./Helper/DataValidator');
var DV = new DataValidator();

var UsersRestController = express.Router();

var addUser = function (req, res) {
    // Create new user

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

    newUser.save(function (err) {
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

    });

};


var getUserById = function (req, res) {
    // get user by id
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not find user because of database error !"
            });
            return;
        }
        res.json({
            status: true,
            user: user
        });

    });
};

var editUserById = function (req, res) {
    // remove user by id
    User.findById(req.params.id, function (err, user) {

        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not remove user because of database error !"
            });
            return;
        }

        for (var k in req.body) {
            user[k] = req.body[k]
        }

        user.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not edit user because of database error !"
                });
                return;
            }

            res.status(200).json({
                status: true,
                message: 'User update!',
            });

        });

    });
};

var removeUserById = function (req, res) {
    // remove user by id
    User.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not remove user because of database error !"
            });
            return;
        }

        res.json({
            status: true,
            message: 'User Successfully deleted'
        });

    });
};

var getAllUser = function (req, res) {
    // get all user
    User.find(function (err, users) {
        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not get list of user because of database error !"
            });
            return;
        }
        res.json({
            status: true,
            users: users
        });

    });
};

UsersRestController.post('/user', addUser);

UsersRestController.get('/user/:id', getUserById);

UsersRestController.put('/user/:id', editUserById);

UsersRestController.delete('/user/:id', removeUserById);

UsersRestController.get('/users', getAllUser);

module.exports = UsersRestController;
