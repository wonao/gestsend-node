const fs = require('fs');
const path = require('path');

const LOG_PATH = process.env.LOG_PATH || path.resolve(__dirname, '../../data/app.log');

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(LOG_PATH, line, (err) => {
    if (err) console.error('Log write error:', err.message);
  });
}

module.exports = {
  log,
  LOG_PATH,
};

