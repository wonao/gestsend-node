const { log } = require('../utils/logger');

module.exports = function(req, res, next) {
  log(`${req.method} ${req.originalUrl}`);
  next();
};

