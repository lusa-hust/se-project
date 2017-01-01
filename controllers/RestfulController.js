/**
 * Created by samhv on 12/4/16.
 */
'use strict'


var express = require('express');
var calSoundex = require('../helper/soundex');
var Word = require('../models/Word');
var Soundex = require('../models/Soundex');


var RestfulController = express.Router();


var searchWord = function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    Word.findOne({'word': req.params.word}).exec().then(function (word) {
        if (word) {
            // found
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


RestfulController.get('/search/word/:word', searchWord);

module.exports = RestfulController;
