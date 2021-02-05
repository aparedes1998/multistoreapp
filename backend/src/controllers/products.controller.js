/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const { Products, Stores } = require('../models');

const liststore = async (event) => {
  const { queryStringParameters } = event;
  const _id = queryStringParameters._id;
  return Stores.find({ products: { $in: [_id] } }) // retrive stores given a product id
    .then((stores) => {
      if (!stores || stores.length === 0) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'No product in store' }),
        };
      }
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stores }),
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

const search = async (event) => {
  const { queryStringParameters } = event;
  const q = queryStringParameters.q;
  // Searching a product that contains a word in name, description or supplier
  return Products.find({
    $or: [
      {
        name: {
          $regex: q,
          $options: 'i',
        },
      },
      {
        description: {
          $regex: q,
          $options: 'i',
        },
      },
      {
        supplier: {
          $regex: q,
          $options: 'i',
        },
      },
    ],
  })
    .then(async (products) => {
      const _ids = products.map((product) => product._id);
      const stores = await Stores.find({
        products: {
          $elemMatch: {
            productId: {
              $in: _ids,
            },
            stock: {
              $gt: 0,
            },
          },
        },
      });

      const data = products.reduce((p, product) => {
        const locations = stores.reduce((l, store) => {
          const [exist] = store.products.filter((pro) => {
            return pro.productId.toString() === product._id.toString();
          });
          if (exist) {
            l.push({
              name: store.name,
              latitude: store.latitude,
              longitude: store.longitude,
              price: exist.price,
            });
          }
          return l;
        }, []);
        if (locations.length > 0) {
          p.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            photo: product.photo,
            supplier: product.supplier,
            stores: locations,
          });
        }
        return p;
      }, []);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

/**
 * Creates a product if it hasn't been defined earlier and adds it to a store.
 * @param {*} event
 */
const create = async (event) => {
  const { body } = event;
  const {
    name,
    description,
    photo,
    supplier,
    stock,
    price,
    storeId,
  } = JSON.parse(body);
  return Products.findOne({
    name,
  })
    .then(async (product) => {
      if (product) {
        return product;
      }
      const created = await Products.create({
        name,
        description,
        photo,
        supplier,
      });
      return created;
    })
    .then(async (product) => {
      const store = await Stores.findById(storeId); // Perhaps we can do this with users.
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
        body: JSON.stringify(product),
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

module.exports = { search, create, liststore };
