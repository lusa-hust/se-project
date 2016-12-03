'use strict'

var async = require('async');
var fs = require('fs');
var Radix64 = require('./redix_64')

var radix64 = new Radix64();

var indexLines = fs.readFileSync('anhviet109K.index').toString().split("\n");

var fd = fs.openSync('anhviet109K.dict', 'r');

var indexDatas = []

var addWord = require('../helper/util').addWord;

var processIndexCb = function (line, callback) {
    var data = line.split("\t");
    var jsonData = {
        'word': data[0],
        'pos': radix64.decodeToInt(data[1]),
        'size': radix64.decodeToInt(data[2])
    };
    indexDatas.push(jsonData);
};

async.each(indexLines, processIndexCb, function (err) {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log(err);
        console.log('A file failed to process');
    } else {
        console.log('All files have been processed successfully');
    }
});

var dictionaryDatas = []


var getWordCallback = function (err, bytesRead, buffer) {
    if (err) {
        console.log(err);
        process.exit();
    }

    else {
        // count++;
        // console.log(dictionaryDatas.length);
        dictionaryDatas.push(buffer.toString())
        // console.log(bytesRead)
        // if(count == 2)
        //     process.exit();
    }
}

var getWord = function (json, callback) {

    var buffer = new Buffer(json.size);

    fs.read(fd, buffer, 0, json.size, json.pos, getWordCallback);

    callback()
}


async.each(indexDatas, getWord, function (err) {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log(err);

    } else {

    }
});

var processDictionaryData = function (data, callback) {
    setTimeout(function () {
        var flag;
        try {
            flag = (data.split('\n')[0].match(/\//g) || []).length >= 2;
        } catch (err) {
            console.log('===================\n')
            console.log(data);
            console.log('===================\n')
        }


        var re = /@(.*)\n/;
        if (flag) {
            re = /@(.*)(?=\/.*\/)/;
        }

        var json = {}

        // get word
        try {
            json.word = re.exec(data)[1].trim();
        } catch (err) {
            console.log('===================\n')
            console.log(data);
            console.log('===================\n')
            process.exit()
            console.log(err)
        }


        if (flag) {
            // get pronounce if have
            re = /\/(.*)\//;
            json.pronounce = re.exec(data)[1];
        }

        var lines = data.split('\n');
        lines.splice(0, 1);
        var newText = lines.join('\n');

        // get meaning
        json.meaning = newText;

        //  create model word


        addWord(json, function (soundex, word) {
            console.log(soundex, word);
        });
        callback();

    }, 30)


};


setTimeout(function () {
    fs.close(fd);

    async.eachLimit(dictionaryDatas, 1, processDictionaryData, function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log(err);

        } else {
            console.log('done!');
        }
    });

}, 30)

