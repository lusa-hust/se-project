var app = {
  api: {
    lookup: '/api/search/word/',
  },
  meaning: {
    content: '',
    pointer: 0,
    length: 0,
  },
  delimiter: ['*', '-', '=', '+'],
};
$(document).ready(function () {

  // when user click on lookup button
  $(document).on("click", ".lookup-button", function() {
    var word = $('input[name="word"]').val();
    lookup(word);
  });

  // when user click on cross reference link
  $(document).on("click", ".cross-ref-link", function () {
    var word = $(this).html();
    $('input[name="word"]').val(word);
    lookup(word);
  });
});
