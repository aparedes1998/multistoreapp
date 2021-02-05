const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Products',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: false,
      },
      photo: {
        type: String,
        required: true,
      },
      supplier: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
