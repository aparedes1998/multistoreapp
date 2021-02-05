const dotenv = require('dotenv');

const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Use the actual path where your .env is

const jwtSecret = {
  secret: 'secret', // Sign using any secret you want
};

const mongodbUri = process.env.MONGO_URI;

module.exports = { mongodbUri, jwtSecret };
