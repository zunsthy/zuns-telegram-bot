const callapi = require('../../callapi');

module.exports = (data, cb) => {
  const {
    message_id,
    chat,
    new_chat_participant,
    new_chat_members,
  } = data;

  if (new_chat_members.length === 0) {
    cb();
    return;
  }

  new_chat_members.forEach((user) => {
    const name = user.first_name.slice(0, 100);

    callapi('sendMessage', {
      chat_id: chat.id,
      reply_to_message_id: message_id,
      disable_web_page_preview: true,
      disable_notification: true,
      text: '\u6B22\u8FCE ' + name + '\u5165\u7FA4',
    }, cb);
  });
};

