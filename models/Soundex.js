/**
 * Created by samhv on 12/3/16.
 */
'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('./db');

var Soundex = new Schema({
    _id: Number,
    soundex: {
        type: String,
        require: true,
        unique: true
    },
    words: [{ type: Number, ref: 'Word' }],
});

Soundex.plugin(autoIncrement.plugin, 'Soundex');


module.exports = mongoose.model('Soundex', Soundex);