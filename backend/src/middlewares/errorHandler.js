const { log } = require('../utils/logger');

module.exports = function(err, req, res, next) {
  log(`ERROR ${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(500).send(err.message);
};

