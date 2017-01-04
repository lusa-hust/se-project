var app = {
  api: {
    lookup: '/api/search/word/',
  },
  word: '',
  msg: null,
  meaning: {
    content: '',
    pointer: 0,
    length: 0,
  },
  delimiter: ['*', '-', '=', '+'],
};

$(document).ready(function () {

  // init voice object
  var msg = new SpeechSynthesisUtterance();
  msg.voiceURI = 'native';
  msg.lang = 'en-US';
  app.msg = msg;

  // when user clicks on lookup button
  $(document).on("click", ".lookup-button", getInputAndLookup);

  // when user types on search box
  $(document).on("keypress", 'input[name="word"]', function (e) {
    if (e.which == 13) {
      getInputAndLookup();
    }
  });

  // when user clicks on cross reference link
  $(document).on("click", ".cross-ref-link", function () {
    var word = $(this).html();
    $('input[name="word"]').val(word);
    lookup(word);
  });

  // when user clicks on the speaker
  $(document).on("click", 'span.glyphicon-volume-up', function () {
    app.msg.text = app.word;
    window.speechSynthesis.speak(app.msg);
  });
});
