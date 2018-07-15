const newMembersService = require('./newMembers');

const expireTime = 60; // second

module.exports = (data, cb) => {
  const now = Date.now() / 1000;
  const date = data.date;
  
  if (now - date > expireTime) {
    cb();
    return;
  }

  if (data.new_chat_members) {
    newMembersService(data, cb);
  } else {
    cb();
  }
};

