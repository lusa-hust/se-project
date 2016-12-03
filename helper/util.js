/**
 * Created by samhv on 12/3/16.
 */

var Word = require('../models/Word');
var calSoundex = require('./soundex');
var Soundex = require('../models/Soundex');


var addSoundex = function (soundex, callback) {


    Soundex.findOne({soundex: soundex}).then(function (foundSoundex) {

        if (foundSoundex == null) {
            var newSoundex = new Soundex({soundex: soundex});
            newSoundex.save(function (err) {
                callback(newSoundex)
            })
        } else {
            callback(foundSoundex)
        }
    });
};

var addWordToSoundex = function (word, soundex, callback) {
    addSoundex(soundex, function (s) {
        word.soundex = s._id;
        word.markModified('soundex');
        word.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                s.words.push(word._id);
                s.markModified('words');
                s.save();
            }

        });
        callback(s, word);
    })
};

exports.addWord = function (data, callback) {
    // console.log(data);
    if (data.word === undefined)
        return false;

    if (data.meaning === undefined)
        return false;

    var word = new Word({word: data.word, meaning: data.meaning});


    if (data.pronounce !== undefined) {
        word.pronounce = data.pronounce;
    }


    word.save(function (err) {

        addWordToSoundex(word, calSoundex(word.word), callback);

    });
};