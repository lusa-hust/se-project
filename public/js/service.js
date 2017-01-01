app.host = 'http://52.36.12.106';

/**
 * service used to get data
 */
function getData(url, urlData) {
  return $.ajax({
    type: 'GET',
    url: app.host + url + urlData,
  });
}
