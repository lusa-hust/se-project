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
