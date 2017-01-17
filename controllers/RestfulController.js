/**
 * Created by samhv on 12/4/16.
 */
'use strict'


var express = require('express');
var calSoundex = require('../helper/soundex');
var Word = require('../models/Word');
var Soundex = require('../models/Soundex');
var User = require('../models/User');
var TrackingList = require('../models/TrackingList')

var RestfulController = express.Router();


var searchWord = function (req, res) {


    Word.findOne({'word': {'$regex': '^' + req.params.word + '$', $options: 'i'}}).exec().then(function (word) {
        if (word) {
            // found

            if (req.authUser !== undefined) {
                TrackingList.findOne({'user_id': req.authUser._id}).exec().then(function (tList) {
                    if (tList) {

                        var list = tList.list;


                        if (list[word.word] !== undefined) {
                            list[word.word] = list[word.word] + 1;
                        } else {
                            list[word.word] = 1;
                        }


                        tList.list = list;
                        tList.markModified('list');
                        tList.save();


                    } else {


                        var trackList = new TrackingList();
                        trackList.user_id = user._id;
                        trackList.save(function (err, tList) {
                            if (!err) {
                                var list = {};
                                list[word.word] = 1;
                                tList.list = list;
                                tList.markModified('list');
                                tList.save();
                            }
                        });
                    }
                })


            }


            res.json({
                status: true,
                found: true,
                word: word
            });
            res.end();

        } else {
            // not found
            var wordSoundex = calSoundex(req.params.word);
            Soundex.findOne({'soundex': wordSoundex}).populate('words').exec().then(function (soundex) {
                if (soundex) {
                    res.json({
                        status: true,
                        found: false,
                        soundex: soundex
                    });
                    res.end();
                } else {
                    res.json({
                        status: false
                    });
                    res.end();
                }
            });
        }
    });


};

var suggest = function (req, res) {
    var limit = Number(req.query.limit) || 10;

    Word.find({'word': {'$regex': '^' + req.params.word, $options: 'i'}}).limit(limit).exec().then(function (words) {
        if (words) {
            // found
            res.json({
                status: true,
                words: words
            });
            res.end();
        } else {
            res.json({
                status: false,
            });
            res.end();
        }
    });

};

var getUserForToken = function (req, res, next) {

    if (req.headers.token !== undefined) {
        User.findOne({'token': req.headers.token}, function (err, user) {
            if (user != null) {
                req.authUser = user;
                next();
            }
        });
    } else {
        next();
    }
};

RestfulController.use('/', getUserForToken);
RestfulController.get('/search/word/:word', searchWord);
RestfulController.get('/suggest/:word', suggest);

module.exports = RestfulController;
