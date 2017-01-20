$(document).ready(function () {

  $('#login-button').click(function () {
    // get user input
    var email = $("input[name='email']").val();
    var password = $("input[name='password']").val();

    var data = {
      email: email,
      password: password,
    }
    postData(app.api.login, data).done(postLogin);
  });
});
