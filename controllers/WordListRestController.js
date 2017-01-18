/**
 * Created by samhv on 11/28/16.
 */

'use strict'

var express = require('express');
var WordList = require('../models/WordList');


var WordListRestController = express.Router();


var deleteWordToList = function (req, res) {
    if (req.authUser === undefined) {
        res.status(500).json({
            status: false,
            error: "Can not find Word list because don't have token in header"
        });
        res.end();
        return;
    }

    WordList.findOne({'user_id': req.authUser._id}, function (err, wList) {
        if (err || !wList) {
            res.status(500).json({
                status: false,
                error: "Can not find Word list because database error"
            });
            res.end();
            return;
        }

         if (wList.list === undefined) {
             res.status(200).json({
                 status: false,
                 message: 'List is empty !'
             });
             res.end();
             return;
         }

         var list = wList.list;


        var index = list.indexOf(req.params.word);

        if (index == -1) {
            res.status(200).json({
                status: false,
                message: 'Word not in list or List is empty !'
            });
            res.end();
            return;
        }

        list.splice(index, 1);


        wList.list = list;

        wList.markModified('list');

        wList.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not delete Word list because database error"
                });
                res.end();
                return;
            }

            res.status(200).json({
                status: true,
                message: 'Delete word success !'
            });
        })

    });
};

var addWordToList = function (req, res) {
    if (req.authUser === undefined) {
        res.status(500).json({
            status: false,
            error: "Can not find Word list because don't have token in header"
        });
        res.end();
        return;
    }

    WordList.findOne({'user_id': req.authUser._id}, function (err, wList) {
        if (err || !wList) {
            res.status(500).json({
                status: false,
                error: "Can not find Word list because database error"
            });
            res.end();
            return;
        }

        var list = wList.list || [];

        if (list.indexOf(req.params.word) != -1) {
            res.status(500).json({
                status: false,
                error: "Word already in list"
            });
            res.end();
            return;
        }

        list.push(req.params.word);

        wList.list = list;

        wList.markModified('list');

        wList.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not add Word list because database error"
                });
                res.end();
                return;
            }

            res.status(201).json({
                status: true,
                message: 'Add word success !'
            });
        })

    });
};

var getWordList = function (req, res) {
    // get Word list

    if (req.authUser === undefined) {
        res.status(500).json({
            status: false,
            error: "Can not find Word list because don't have token in header"
        });
        res.end();
        return;
    }

    WordList.findOne({'user_id': req.authUser._id}, function (err, wList) {
        if (err || !wList) {
            res.status(500).json({
                status: false,
                error: "Can not find Word list because database error"
            });
            res.end();
            return;
        }
        res.json({
            status: true,
            trackingList: wList
        });

    });
};


var cleanWordList = function (req, res) {

    if (req.authUser === undefined) {
        res.status(500).json({
            status: false,
            error: "Can not find Word list because don't have token in header"
        });
        res.end();
        return;
    }

    WordList.findOne({'user_id': req.authUser._id}, function (err, wList) {

        if (err || !wList) {
            res.status(500).json({
                status: false,
                error: "Can not find Word list because of database error !"
            });

            res.end();
            return;
        }


        wList.list = [];

        wList.markModified('list');
        wList.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not clean Word list because of database error !"
                });
                return;
            }

            res.status(200).json({
                status: true,
                message: 'Word list Clean !'
            });

        });


    });

};


WordListRestController.get('/list', getWordList);

WordListRestController.get('/list/:word', addWordToList);

WordListRestController.delete('/list', cleanWordList);

WordListRestController.delete('/list/:word', deleteWordToList);

module.exports = WordListRestController;
