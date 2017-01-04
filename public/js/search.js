var app = {
  api: {
    lookup: '/api/search/word/',
  },
  word: '',
  meaning: {
    content: '',
    pointer: 0,
    length: 0,
  },
  delimiter: ['*', '-', '=', '+'],
};

$(document).ready(function () {

  // when user click on lookup button
  $(document).on("click", ".lookup-button", getInputAndLookup);

  // when user type on search box
  $(document).on("keypress", 'input[name="word"]', function (e) {
    if (e.which == 13) {
      getInputAndLookup();
    }
  });

  // when user click on cross reference link
  $(document).on("click", ".cross-ref-link", function () {
    var word = $(this).html();
    $('input[name="word"]').val(word);
    lookup(word);
  });


});
