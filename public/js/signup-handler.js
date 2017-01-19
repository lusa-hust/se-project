function postSignup(data) {
  if (data) {
    // if we receive data
    if (data.status) {
      // if registration is successful
      console.log(data);
      $.jGrowl(data.message, { theme: 'jgrowl-success', life: 2000, close: openHome});
    } else {
      // registration failed
      $.jGrowl(data.message, { theme: 'jgrowl-fail', life: 2000});
    }
  }
}

function openHome() {
  window.location.href = app.host + "/";
}
