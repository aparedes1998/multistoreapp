/* eslint-disable no-underscore-dangle */
const middy = require('@middy/core');

const { database, authenticator } = require('./src/middleware');
const {
  create,
  list,
  update,
  information,
} = require('./src/controllers/stores.controller');

const storesHandler = async (event) => {
  if (event.httpMethod === 'GET') {
    const { queryStringParameters } = event;
    if (queryStringParameters._id) {
      const data = await information(event);
      return data;
    }
    const res = await list(event);
    return res;
  }
  if (event.httpMethod === 'POST') {
    const res = await create(event);
    return res;
  }
  if (event.httpMethod === 'PUT') {
    const res = await update(event);
    return res;
  }
  return null;
};

exports.handler = middy(storesHandler).use([database(), authenticator()]);
