/**
 * Created by samhv on 11/30/16.
 */
'use strict'

var User = require('../../models/User')

var DataValidator = function () {
    this.emailValidator = function (email) {
        if (checkEmailFormat(email) == false) {
            return false;
        }
    }

    var checkEmailFormat = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    this.nameValidator = function (name) {
        var re = /^[a-zA-Z ]+$/;
        return re.test(name)
    }
}

module.exports = DataValidator;