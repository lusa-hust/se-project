function getInputAndLookup() {
  var word = $('input[name="word"]').val();
  lookup(word);
}

function lookup(word) {
  if (!word) {
    // if the word is empty
    // do nothing
    return;
  }

  getData(app.api.lookup, word).done(function(data) {
    if (data.status) {
      // if fetch successfully
      if (data.found) {
        // if the word is found
        if (localStorage.getItem("token")) {
          // if we have token
          getHistory();
        }

        displayWord(data.word);
        // set the current lookup word
        app.word = word;
        // search for related images

      } else {
        // not found
        // suggest the list of similar words
        // sorry I don't sanitise input here
        $('.lookup-word').html('\'' + word + '\' not found!');
        $('.word-pronounce').html('Search suggestions for \'' + word + '\':');
        displayRelatedWords(data.soundex);
        // reset the current looking up word to empty
        app.word = '';
      }
    } else {
      // display error
    }
  });
}

function getHistory() {
  getData(app.api.tracking).done(showTrackingList);
}

function showTrackingList(data) {
  var html = '';
  if (data) {
    if (data.status) {
      var list = data.trackingList.list;
      console.log(list);
      for (var item in list) {
        if (list.hasOwnProperty(item)) {
          html += '<div class="history-item clearfix">';
          html += '<div class="history-word">' + item;
          html += '</div><div class="history-count">' + list[item] +'</div></div>';
        }
      }
      if (html) {
        $('.history-container').css({"display": "block"});
        $('.history-body').html(html);
        if (list.hasOwnProperty(app.word) && list[app.word] > 1) {
          $('.tracking-times').html('You looked up this word ' + list[app.word] + ' times');
        }
      } else {
        $('.history-container').css({"display": "none"});
      }
    }
  }
}

function displayWord(word) {
  $('.lookup-word').html(word.word);
  var pronounce = word.pronounce ? word.pronounce : '';
  $('.word-pronounce').html(
      '<span class="pronounce-text">Pronounce: </span><span class="glyphicon glyphicon-volume-up"></span> ' +
      pronounce);
  app.meaning.content = word.meaning;
  app.meaning.length = word.meaning.length;
  app.meaning.pointer = 0;
  $('.word-meaning').html(parseMeaning());
}

/**
 * display the list of suggestions for not found word
 */
function displayRelatedWords(soundexObj) {
  var words = soundexObj.words;
  var len = words.length;
  var i = 0;
  var html = '';

  for (i = 0; i < len; i++) {
    // loop through the word list and make html string for that word
    html += '<div class="row suggested-word">' + (i+1) + '. ' +
            '<a href="#" class="cross-ref-link">' + words[i].word + '</a></div>';
  }

  html = '<div class="suggestion-container">' + html + '</div>';

  $('.word-meaning').html(html);
}

/**
 * display the suggestions for the currently typing word
 */
 function suggest(typingWord) {
   getData(app.api.suggest, typingWord).done(displaySuggestions);
 }

/**
 * make html string for suggestion list
 */
 function displaySuggestions(data) {
   if (data && data.status) {
     // if getting suggestions successfully
     // display suggested words
     var words = data.words;
     var len = words.length;
     var i = 0;
     var html = '';

     for(i = 0; i < len; i++) {
       html += getSuggestionItem(words[i].word);
     }
     $('.suggest-box').css({"display": "block"});
     $('.suggest-box').html(html);
   }
 }

 function getSuggestionItem(word) {
   return '<div class="suggest-item"><a href="#" class="cross-ref-link">'+word+'</a></div>';
 }
