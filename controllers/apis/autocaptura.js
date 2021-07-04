const request = require("request");

let options = { 
    method: 'POST',
    url: 'https://sandboxapi.7oc.cl/session-manager/v1/session-id',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data'
    },
    formData: { apiKey: 'API_KEY' , autocapture: 'true'}
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
