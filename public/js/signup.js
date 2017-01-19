$(document).ready(function () {
  $(document).on("click", "#signup-button", function () {
    // get user input
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var password = $("input[name='password']").val();

    var data = {
      name: name,
      email: email,
      password: password,
    }

    postData(app.api.signup, data).done(postSignup);
  });
});
