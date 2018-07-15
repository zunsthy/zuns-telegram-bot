const callapi = require('../callapi');

const noop = () => {};

module.exports = (cb = noop) => callapi('deleteWebhook', {}, (err, data, res) => {
  if (!err && res.statusCode === 200) {
    console.info('webhook delete successfully.');
    cb();
    return;
  }

  const error = err
    || new Error(`Set Webhook fail. ERROR[${res.statusCode}]:`, data);
  cb(error);
  throw error;
});

