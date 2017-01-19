var app = {
  api: {
    lookup: '/api/search/word/',
    suggest: '/api/suggest/',
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    tracking: '/api/tracking',
  },
  word: '',
  msg: null,
  meaning: {
    content: '',
    pointer: 0,
    length: 0,
  },
  delimiter: ['*', '-', '=', '+'],
  suggestQueue: [],
};

app.host = location.protocol + "//" + window.location.hostname + (location.port ? ':'+location.port: '');

/**
 * service used to get data
 */
function getData(url, urlData) {
  var token = localStorage.getItem("token");
  var urlPath = urlData ? app.host + url + urlData : app.host + url;
  if (token) {
    return $.ajax({
      type: 'GET',
      url: urlPath,
      headers: {
        "token": token,
      }
    });
  } else {
    return $.ajax({
      type: 'GET',
      url: urlPath,
    });
  }
}

/**
 * service used to post data
 */
 function postData(url, data) {
   return $.ajax({
     type: 'POST',
     url: app.host + url,
     data: data,
     contentType: "application/x-www-form-urlencoded",
   });
 }

/**
 * service used to check login
 */
 function checkLogin(token) {

 }

 function openHome() {
   window.location.href = app.host + "/";
 }
