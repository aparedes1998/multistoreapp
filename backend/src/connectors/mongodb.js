const mongoose = require('mongoose');

const options = {
  bufferCommands: false,
  bufferMaxEntries: 0,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodb = (uri) => mongoose.connect(uri, options);

module.exports = mongodb;
