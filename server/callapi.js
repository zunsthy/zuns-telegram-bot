const get = require('simple-get');

const config = require('../config');

module.exports = (api, data, cb) =>
  get.concat({
    url: 'https://api.telegram.org/bot'
      + config.token
      + '/'
      + api,
    method: 'POST',
    json: true,
    body: data,
  }, (err, res, data) => cb(err, data, res));

