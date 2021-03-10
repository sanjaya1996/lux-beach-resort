const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:5000' }));
  app.use(
    createProxyMiddleware('/uploads', {
      target: `${process.env.REACT_APP_API_URI}`,
    })
  );
};
