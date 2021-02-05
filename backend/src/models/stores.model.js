const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  },
  {
    _id: false,
  },
);

const StoresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    products: [
      {
        type: ProductsSchema,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Stores', StoresSchema);
