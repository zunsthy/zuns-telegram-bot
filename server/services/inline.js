const callapi = require('../callapi');

module.exports = (data, cb) => {
  const { id, query } = data;

  const results = [{
    type: 'article',
    id: '1',
    title: query,
    message_text: query,
  }];

  const ans = {
    inline_query_id: id,
    results: query ? results : [],
    cache_time: 60,
    is_personal: false,
  };

  callapi('answerInlineQuery', ans, cb);
};

