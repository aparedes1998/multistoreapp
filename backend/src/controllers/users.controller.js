const bcrypt = require('bcrypt');
const { Users } = require('../models');

const profile = async (event) => {
  const { auth } = event;
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...auth,
    }),
  };
};

const update = async (event) => {
  const { auth, body } = event;
  const { name } = JSON.parse(body);
  return Users.updateOne(
    {
      _id: auth.id,
    },
    {
      name,
    },
  )
    .then((updated) => {
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updated,
        }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error,
        }),
      };
    });
};

const register = async (event) => {
  const { body } = event;
  const { name, email, password } = JSON.parse(body);
  return Users.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error }),
      };
    });
};

module.exports = { profile, update, register };
