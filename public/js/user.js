$(document).ready(function () {
  // check token
  var name = localStorage.getItem("name");
  var token = localStorage.getItem("token");
  if (name && token) {
    $('.right-menu-container').append('<a href="#" class="right-menu logout-button">Log out</a>');
    $('.right-menu-container').append('<a href="#" class="right-menu">' + name +'</a>');
  } else {
    $('.right-menu-container').append('<a href="/login" class="right-menu">Log in</a>');
    $('.right-menu-container').append('<a href="/signup" class="right-menu">Sign up</a>');
  }

  $(document).on('click', '.logout-button', function() {
    localStorage.clear();
    window.location.reload(true);
  })
});
