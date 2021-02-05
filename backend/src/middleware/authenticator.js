const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const { Users } = require('../models');

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret.secret);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return null;
    }

    throw err;
  }
};

const authentication = () => ({
  before: (handler, next) => {
    const { headers, path, httpMethod } = handler.event;
    if (path === '/.netlify/functions/products' && httpMethod === 'GET') {
      next();
      return;
    }

    const { authorization } = headers;
    if (!authorization) {
      handler.callback(null, {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'You must be logged in.' }),
      });
      return;
    }
    const decoded = verifyToken(authorization);
    if (!decoded) {
      handler.callback(null, {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Invalid token.',
        }),
      });
      return;
    }
    const { sub } = decoded;
    Users.findById(sub)
      .then((user) => {
        if (!user) {
          handler.callback(null, {
            statusCode: 401,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              error: 'Invalid token.',
            }),
          });
          return;
        }

        handler.event.auth = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        next();
      })
      .catch(next);
  },
});

module.exports = authentication;
