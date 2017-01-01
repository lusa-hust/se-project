var app = {
  api: {
    lookup: '/api/search/word/',
  }
}
$(document).ready(function () {

  // when user click on lookup button
  $(document).on("click", ".lookup-button", function() {
    var word = $('input[name="word"]').val();
    getData(app.api.lookup, word).done(function(data) {
      if (data.status) {
        // if fetch successfully
        if (data.found) {
          // if the word is found
          displayWord(data.word);
        } else {
          // not found
          // display error
        }
      } else {
        // display error
      }
    });
  });
});
