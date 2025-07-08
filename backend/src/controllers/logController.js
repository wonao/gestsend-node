const fs = require('fs');
const { LOG_PATH } = require('../utils/logger');

exports.getLogs = (req, res) => {
  fs.readFile(LOG_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Unable to read logs');
    res.type('text/plain').send(data);
  });
};

