/**
 * Created by samhv on 12/3/16.
 */
'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('./db');

var SoundexSchema = new Schema({
    _id: Number,
    soundex: {
        type: String,
        require: true,
        unique: true
    },
    words: [{ type: Number, ref: 'word' }],
});

SoundexSchema.plugin(autoIncrement.plugin, 'soundex');


module.exports = mongoose.model('soundex', SoundexSchema);