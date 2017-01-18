var app = {
  api: {
    lookup: '/api/search/word/',
    suggest: '/api/suggest/',
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
    url: app.host + url + urlData,
  });
}

/**
 * service used to check login
 */
 function checkLogin(token) {
   
 }
