const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const config = require('../config/config');

const login = async (event) => {
  const { body } = event;
  const { email, password } = JSON.parse(body);
  return Users.findOne({
    email,
  })
    .then((found) => {
      if (found && bcrypt.compareSync(password, found.password)) {
        const token = jwt.sign(
          {
            sub: found.id,
          },
          config.jwtSecret.secret,
          {
            expiresIn: '1d',
          },
        );
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            name: found.name,
            email: found.email,
          }),
        };
      }
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid email/password' }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error }),
      };
    });
};

module.exports = { login };
