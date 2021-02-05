const middy = require('@middy/core');
const { database } = require('./src/middleware');
const { register } = require('./src/controllers/users.controller');

const accountHandler = async (event) => {
  if (event.httpMethod === 'POST') {
    const res = await register(event);
    return res;
  }
  return null;
};

exports.handler = middy(accountHandler).use(database());
