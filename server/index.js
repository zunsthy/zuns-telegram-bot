const http = require('http');
const bl = require('bl');

const config = require('../config.json');

const setWebhook = require('./services/setWebhook');
const delWebhook = require('./services/delWebhook');

const inlineService = require('./services/inline'); 
const inlineChosenService = require('./services/inlineChosen'); 
const messageService = require('./services/message');

const safeParse = (buf) => {
  try {
    return JSON.parse(buf.toString('utf8'));
  } catch(ex) {
    return buf.toString('utf8');
  }
};

const once = (fn) => {
  let flag = false;
  return function() {
    if (flag) return;
    flag = true;
    return fn.apply(null, arguments);
  };
};

const main = (req, res) => {
  const callback = once((err) => {
    if (err) res.end('false');
    else res.end('true');
  });

  req.pipe(bl((err, buf) => {
    const data = safeParse(buf);
    const updateId = data.update_id;
    if (data.inline_query) {
      inlineService(data.inline_query, callback);
    } else if (data.chosen_inline_result) {
      inlineChosenService(data.chosen_inline_result, callback);
    } else if (data.message) {
      messageService(data.message, callback);
    } else {
      console.log(data);
      callback();
    }
  }));
};

const server = http.createServer(main);

server.listen(config.port, config.ip, () => {
  console.info('server start');
  setWebhook();
});

const onexit = (opts = {}) => (err) => {
  if (err) console.error(err);

  if (opts.exit) {
    delWebhook(() => {
      process.exit(err ? -1 : 0);
    });
  }
};

process.on('exit', onexit());
process.on('SIGINT', onexit({ exit: true }));
process.on('uncaughtException', onexit({ exit: true }));
process.on('unhandledRejection', onexit({ exit: true }));

