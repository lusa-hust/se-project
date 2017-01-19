var app = {
  api: {
    lookup: '/api/search/word/',
    suggest: '/api/suggest/',
    signup: '/api/auth/signup',
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
  return $.ajax({
    type: 'GET',
    url: app.host + url,
  });
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
