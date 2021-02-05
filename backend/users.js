const middy = require('@middy/core');

const { database, authenticator } = require('./src/middleware');
const { profile, update } = require('./src/controllers/users.controller');

const usersHandler = async (event) => {
  if (event.httpMethod === 'GET') {
    const res = await profile(event);
    return res;
  }
  if (event.httpMethod === 'PUT') {
    const res = await update(event);
    return res;
  }
  return null;
};

exports.handler = middy(usersHandler).use([database(), authenticator()]);
