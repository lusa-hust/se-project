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

var dictDatas = []


var getWord = function (indexData, callback) {

    var buffer = new Buffer(indexData.size);

    fs.read(fd, buffer, 0, indexData.size, indexData.pos, function (err, bytesRead, buffer) {
        if (err) {
            console.log(err);
            process.exit();
        }

        else {
            // count++;
            // console.log(dictionaryDatas.length);

            var dictData = {};

            dictData.word = indexData.word;
            dictData.content = buffer.toString()
            dictDatas.push(dictData);
            // console.log(bytesRead)
            // if(count == 2)
            //     process.exit();
        }
    });

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
            flag = (data.content.split('\n')[0].match(/\//g) || []).length >= 2;
        } catch (err) {
            console.log('===================\n')
            console.log(data.content);
            console.log('===================\n')
        }


        var re = /@(.*)\n/;
        if (flag) {
            re = /@(.*)(?=\/.*\/)/;
        }

        var json = {}

        // get word

        json.word = data.word;


        if (flag) {
            // get pronounce if have
            re = /\/(.*)\//;
            json.pronounce = re.exec(data.content)[1];
        }

        var lines = data.content.split('\n');
        lines.splice(0, 1);
        var newText = lines.join('\n');

        // get meaning
        json.meaning = newText;

        //  create model word


        addWord(json, function (soundex, word) {
            // console.log(soundex, word);
        });
        callback();

    }, 30)


};


setTimeout(function () {
    fs.close(fd);

    async.eachLimit(dictDatas, 20, processDictionaryData, function (err) {
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

