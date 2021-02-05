/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
const middy = require('@middy/core');

const {
  create,
  search,
  liststore,
} = require('./src/controllers/products.controller');

const { database, authenticator } = require('./src/middleware');

const productsHandler = async (event) => {
  if (event.httpMethod === 'GET') {
    const { queryStringParameters } = event;
    if (queryStringParameters._id) {
      const data = await liststore(event);
      return data;
    }
    const res = await search(event);
    return res;
  }
  // if (event.httpMethod === 'PUT') {
  //   const res = await update(event);
  //   return res;
  // }
  if (event.httpMethod === 'POST') {
    const res = await create(event);
    return res;
  }
  return null;
};

exports.handler = middy(productsHandler).use([database(), authenticator()]);
