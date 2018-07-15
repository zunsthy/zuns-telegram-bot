const callapi = require('../callapi');
const config = require('../../config.json');

const noop = () => {};

module.exports = (cb = noop) => callapi('setWebhook', config.webhook, (err, data, res) => {
  if (!err && res.statusCode === 200) {
    console.info('webhook set successfully.');
    cb();
    return;
  }

  const error = err
    || new Error(`Set Webhook fail. ERROR[${res.statusCode}]:`, data);
  cb(error);
  throw error;
});

