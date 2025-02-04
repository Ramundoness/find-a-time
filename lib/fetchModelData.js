var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  var request = new XMLHttpRequest();
  return new Promise(function(resolve, reject) {
      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (request.status >= 200 && request.status < 300) {
          var getResponseObject = JSON.parse(request.responseText);
          return resolve({ data: getResponseObject });
        } else {
          return reject({status: request.status, statusText: request.statusText})
        }
      }
      // console.log(url);
      request.open("GET", url);
      request.send();
      // setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),0);
      // On Success return:
      // resolve({data: getResponseObject});
  });
}

export default fetchModel;
