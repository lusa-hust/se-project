/**
 * Created by samhv on 1/17/17.
 */
'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var TrackingListSchema = new Schema({

    user_id: { type: Number, ref: 'User' },
    list: {}

});


module.exports = mongoose.model('TrackingList', TrackingListSchema);