const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../../webpack.config');

const webpackMiddleware = webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
});

module.exports = webpackMiddleware;
