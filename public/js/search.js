$(document).ready(function () {

  // init voice object
  var msg = new SpeechSynthesisUtterance();
  msg.voiceURI = 'native';
  msg.lang = 'en-US';
  app.msg = msg;

  // when user clicks on lookup button
  $(document).on("click", ".lookup-button", getInputAndLookup);

  // when user types on search box
  $(document).on("keyup", 'input[name="word"]', function (e) {
    if (e.which == 13) {
      // when user press enter button,
      // search word
      // hide the suggest box
      $('.suggest-box').css({"display": "none"});
      getInputAndLookup();
    } else {
      // get suggestions
      var typingWord = $('input[name="word"]').val();
      if (typingWord) {
        // if the value of input box is not empty
        // get the suggestions
        suggest(typingWord);
      } else {
        $('.suggest-box').css({"display": "none"});
      }
    }
  });

  // when user clicks on cross reference link
  $(document).on("click", ".cross-ref-link", function () {
    var word = $(this).html();
    $('input[name="word"]').val(word);
    lookup(word);
  });

  // when search box get focus out
  $(document).on("click", function (e) {
    $('.suggest-box').hide();
  });

  // when user clicks on the speaker
  $(document).on("click", 'span.glyphicon-volume-up', function () {
    app.msg.text = app.word;
    window.speechSynthesis.speak(app.msg);
  });
});
