const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
