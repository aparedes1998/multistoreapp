const { mongodb } = require('../connectors');

// const mongodbUri = process.env.MONGODB_URI;
const { mongodbUri } = require('../config/config');

let cachedDb = null;

const db = () => ({
  before: (handler, next) => {
    // Allow AWS Lambda to reuse cached DB connection between function invocations.
    handler.context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

    if (cachedDb === null) {
      mongodb(mongodbUri)
        .then((connection) => {
          cachedDb = connection;
          next();
        })
        .catch(next);
      return;
    }

    next();
  },
});

module.exports = db;
