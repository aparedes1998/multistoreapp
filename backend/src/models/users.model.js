const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stores',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Users', UsersSchema);
