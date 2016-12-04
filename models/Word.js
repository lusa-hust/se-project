'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('./db');

var WordSchema = new Schema({
    _id: Number,
    word: {
        type: String,
        require: true,
        unique: true
    },
    meaning: {
        type: String,
        require: true
    },

    pronounce: String
});

WordSchema.plugin(autoIncrement.plugin, 'word');


module.exports = mongoose.model('word', WordSchema);