const path = require('path');
const express = require('express');
const webpackMiddleware = require('./middlewares/webpack.middleware');

const { IS_PRODUCTION } = require('./config');

const app = express();

if (IS_PRODUCTION) {
  app.use(express.static(path.resolve(__dirname, '..', 'dist')));
  app.use('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
} else {
  app.use(webpackMiddleware);
}

module.exports = app;
