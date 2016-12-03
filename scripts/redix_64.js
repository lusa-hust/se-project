'use strict'

var MyRedix64 = function () {
    var BASE = 64;
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    var charToDec = {};
    for (var i = 0; i < ALPHABET.length; i++) {
        var char = ALPHABET[i];
        if (char in charToDec) {
            throw new Error('alphabet has duplicate characters!');
        }
        charToDec[char] = i;
    }

    this.decodeToInt = function (string) {
        var i = 0;
        var num = 0;
        do {
            num = num * BASE + charToDec[string[i]];
            i++;
        } while (i < string.length);

        return num;
    }
};


module.exports = MyRedix64;