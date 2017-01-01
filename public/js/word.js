
function displayWord(word) {
  $('.lookup-word').html(word.word);
  var pronounce = word.pronounce ? word.pronounce : '';
  $('.word-pronounce').html(
      '<span class="pronounce-text">Pronounce: </span><span class="glyphicon glyphicon-volume-up"></span> ' +
      pronounce);
  app.meaning.content = word.meaning;
  app.meaning.length = word.meaning.length;
  app.meaning.pointer = 0;
  $('.word-meaning').html(word.meaning);
  parseMeaning();
}

function parseMeaning() {
  var meanObj = app.meaning;
  while(meanObj.pointer < meanObj.length) {
    // loop through each character
    switch (meanObj.content[meanObj.pointer]) {
      case '-':
        console.log(getWordDefinition());
        break;
      case '*':
        console.log(getWordCategory());
        break;
      case '=':
        console.log(getExample());
        break;
      default:
        meanObj.pointer++;
    }
  } // end while

}

function getWordDefinition() {
  return getToken();
}

function getWordCategory() {
  return getToken();
}

function getExample() {
  return getToken();
}
/**
 * check if the character is a delimiter
 */
function isDelimiter(ch) {
  if (ch === '*' || ch === '-' || ch === '=') {
    return true;
  } else {
    return false;
  }
}

function getToken() {
  app.meaning.pointer++;
  // mark the starting point
  var start = app.meaning.pointer;
  while(app.meaning.pointer < app.meaning.length &&
    !isDelimiter(app.meaning.content[app.meaning.pointer])) {
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
