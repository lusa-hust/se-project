function postLogin(data) {
  if (data) {
    if (data.status) {
      // if logged in successfully
      // save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.account.name);
      localStorage.setItem("email", data.account.email);
      $.jGrowl("Log in successfully", { theme: 'jgrowl-success', life: 2000, close: openHome});
    } else {
      $('.error-row').html("Your email or password is not correct");
    }
  }
}
