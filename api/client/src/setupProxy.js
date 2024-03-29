/** @format */

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        ['/api/logout', '/plans/personal', '/plans/business', 'plans/payment'],
        createProxyMiddleware({
            target: 'http://localhost:3500',
        })
    );
};
