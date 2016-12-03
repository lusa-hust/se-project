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

    pronounce: String,
    soundex: { type: Number, ref: 'Soundex' },
});

WordSchema.plugin(autoIncrement.plugin, 'Word');


module.exports = mongoose.model('Word', WordSchema);