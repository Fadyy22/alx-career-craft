const limit = require('express-rate-limit');

const rateLimit = limit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

module.exports = rateLimit;
