const middy = require('@middy/core');

const { database } = require('./src/middleware');
const { login } = require('./src/controllers/auth.controller');

const sessionsHandler = async (event) => {
  if (event.httpMethod === 'POST') {
    const res = await login(event);
    return res;
  }
  return null;
};

exports.handler = middy(sessionsHandler).use(database());
