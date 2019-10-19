const callapi = require('../../callapi');

module.exports = (data, cb) => {
  const {
    message_id,
    chat,
    new_chat_members,
  } = data;

  if (new_chat_members.length === 0) {
    cb();
    return;
  }

  new_chat_members.forEach((user) => {
    const firstName = user.first_name.slice(0, 32);
    const lastName = user.last_name ? user.last_name.slice(0, 32) : '';

    callapi('sendMessage', {
      chat_id: chat.id,
      reply_to_message_id: message_id,
      disable_web_page_preview: true,
      disable_notification: true,
      text: `欢迎 ${firstName}${lastName} 加入群聊`,
    }, cb);
  });
};
