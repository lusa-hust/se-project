/**
 * Created by samhv on 11/28/16.
 */

'use strict'

var express = require('express');
var TrackingList = require('../models/TrackingList');


var TrackingListRestController = express.Router();


var getTrackingListByUserId = function (req, res) {
    // get tracking list by user id
    TrackingList.findOne({'user_id': user._id}, function (err, tList) {
        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not find tracking list because database error"
            });
            return;
        }
        res.json({
            status: true,
            trackingList: tList
        });

    });
};

var editTrackingListByUserId = function (req, res) {
    // edit tracking list by user id
    TrackingList.findOne({'user_id': user._id}, function (err, tList) {

        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not find tracking list because of database error !"
            });
            return;
        }

        var list = tList.list;

        for (var k in req.body) {
            list[k] = req.body[k]
        }


        tList.list = list;
        tList.markModified('list');
        tList.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not edit tracking list because of database error !"
                });
                return;
            }

            res.status(200).json({
                status: true,
                message: 'Tracking list update!'
            });

        });


    });
};

var cleanTrackingListByUserId = function (req, res) {
    TrackingList.findOne({'user_id': user._id}, function (err, tList) {

        if (err) {
            res.status(500).json({
                status: false,
                error: "Can not find tracking list because of database error !"
            });
            return;
        }


        tList.list = {};

        tList.markModified('list');
        tList.save(function (err) {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: "Can not clean tracking list because of database error !"
                });
                return;
            }

            res.status(200).json({
                status: true,
                message: 'Tracking list Clean !'
            });

        });


    });

};


TrackingListRestController.get('/tracking/:id', getTrackingListByUserId);

TrackingListRestController.put('/tracking/:id', editTrackingListByUserId);

TrackingListRestController.delete('/tracking/:id', cleanTrackingListByUserId);


module.exports = TrackingListRestController;
