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
                if (err) {
                    Soundex.findOne({soundex: soundex}).then(function (foundS) {
                        if (foundS == null) {
                            callback(err);
                        } else {
                            callback(null, foundS)
                        }
                    });

                } else {
                    callback(null, newSoundex)
                }

            })

        } else {
            callback(null, foundSoundex)
        }
    });
};

var addWordToSoundex = function (word, soundex, callback) {
    addSoundex(soundex, function (err, s) {
        if (err) {
            console.log(word, soundex);
            process.exit()
        }
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
        if (err) {
            // if have
            Word.findOne({word: data.word}).exec().then(function (wordF) {
                if(wordF == null) {
                    console.log(1);
                } else {
                    if (data.meaning === wordF.meaning) {
                        console.log(3);
                    } else {
                        wordF.meaning = wordF.meaning + data.meaning;
                        wordF.save();
                    }
                }
            });
        } else {
            addWordToSoundex(word, calSoundex(word.word), callback);
        }


    });


};