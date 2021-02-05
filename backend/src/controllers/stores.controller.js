/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const { Products, Stores, Users } = require('../models');

// List the stores from the logged user.
const list = async (event) => {
  const { auth } = event;
  return Users.findById(auth.id)
    .populate({
      path: 'stores',
      select: ['name', 'description', 'latitude', 'longitude'],
    })
    .then((user) => {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.stores),
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

const information = async (event) => {
  const { queryStringParameters } = event;
  const _id = queryStringParameters._id;
  return Stores.findById(_id)
    .populate({
      path: 'products',
      populate: {
        path: 'productId',
        model: Products,
      },
    })
    .then((store) => {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
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

const create = async (event) => {
  const { auth, body } = event;
  const { name, description, latitude, longitude } = JSON.parse(body);
  return Stores.create({
    name,
    description,
    latitude,
    longitude,
  })
    .then(async (store) => {
      try {
        const user = await Users.findById(auth.id);
        user.stores.push(store.id);
        await user.save();
        return {
          statusCode: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(store),
        };
      } catch (error) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error }),
        };
      }
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

/**
 *  Adds a specified product
 *  This function is called when a user wants to add an already existing product to his store.
 * @param {*} event
 */
const update = async (event) => {
  const { body } = event;
  const { stock, price } = JSON.parse(body);
  return Products.findById(event.productId)
    .then(async (product) => {
      try {
        const store = await Stores.findById(body.storeId);
        store.products.push({
          productId: product.id,
          stock,
          price,
        });
        await store.save();
        return {
          statusCode: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(store),
        };
      } catch (error) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(error),
        };
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      };
    });
};

module.exports = { list, information, create, update };
