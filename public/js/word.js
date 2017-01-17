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
    console.log(data);
    if (data.status) {
      // if fetch successfully
      if (data.found) {
        // if the word is found
        displayWord(data.word);
        // set the current lookup word
        app.word = word;
      } else {
        // not found
        // suggest the list of similar words
        // sorry I don't sanitise input here
        $('.lookup-word').html('\'' + word + '\' not found!');
        $('.word-pronounce').html('Search suggestions for \'' + word + '\':');
        displaySuggestions(data.soundex);
        // reset the current looking up word to empty
        app.word = '';
      }
    } else {
      // display error
    }
  });
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

function parseMeaning() {
  var meanObj = app.meaning;
  var html = '';
  while(meanObj.pointer < meanObj.length) {
    // loop through each character
    switch (meanObj.content[meanObj.pointer++]) {
      case '-':
        html += getWordDefinition();
        break;
      case '*':
        html += getWordCategory();
        break;
      case '=':
        html += getExample();
        break;
      case '!':
        if (isLetter(meanObj.content[meanObj.pointer])){
          html += getPhrase();
        }
        break;
      default:
        meanObj.pointer++;
    }
  } // end while

  return html;
}

function getWordDefinition() {
  return '<div class="word-definition"> - ' + getToken() + '</div>';
}

function getWordCategory() {
  return '<div class="word-category">' + getToken() + '</div>';
}

function getExample() {
  var example = '<div class="word-example"><div><em>' + getToken() + '</em></div>';
  app.meaning.pointer++;
  var exampleMeaning = '<div>' + getToken() + '</div></div>';
  return example + exampleMeaning;
}

function getPhrase() {
  var phrase = '<div class="word-phrase word-definition"> + ' + getToken() + '</div>';
  app.meaning.pointer++;
  var phraseMeaning = getToken();
  if (phraseMeaning.search('(xem)') == 1) {
    // if first substring is xem
    var tokens = phraseMeaning.split(' ');
    phraseMeaning = '<div class="word-example"><em>(xem) <a href="#" class="cross-ref-link">' + tokens[1] + '</a></em></div>';
  } else {
    phraseMeaning = '<div class="word-example"><em>' + phraseMeaning + '</em></div>';
  }
  return phrase + phraseMeaning;
}

/**
 * check if the character is a delimiter
 */
function isDelimiter(pointer) {
  var i = 0;
  var len = app.delimiter.length;
  if (app.meaning.content[pointer] === '!' && isLetter(app.meaning.content[pointer+1])) {
    // if it is a ! followed by a letter
    // it is a delimiter
    return true;
  }
  // loop through the array of delimiter
  for (i = 0; i < len; i++) {
    if (app.meaning.content[pointer] === app.delimiter[i]) {
      // if one delimiter is found
      // return true
      return true;
    }
  }

  return false;
}

/**
 * check if the character is a letter
 */
function isLetter(ch) {
  if (ch.match(/[a-zA-Z]/i)) {
    return true;
  } else {
    return false;
  }
}

function getToken() {
  // mark the starting point
  var start = app.meaning.pointer;
  while(app.meaning.pointer < app.meaning.length &&
    !isDelimiter(app.meaning.pointer)) {
      // while the current char is not a delimiter and
      // pointer is less than length
      // move to the next character
      app.meaning.pointer++;
  }

  if(start == app.meaning.pointer ) {
    // nothing to substring
    return null;
  } else {
    var token = app.meaning.content.substring(start, app.meaning.pointer);
    return token.trim();
  }
}

/**
 * display the list of suggestions
 */
function displaySuggestions(soundexObj) {
  console.log(soundexObj);
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
