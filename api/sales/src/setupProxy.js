/** @format */

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    [
      '/api',
      '/auth/google',
      '/auth/facebook',
      '/local/user',
      '/auth/twitter',
      '/auth/register',
      '/api/*',
      '/api/current_user',
      '/api/logout',
    ],
    createProxyMiddleware({
      target: 'http://localhost:3500',
    })
  );
};