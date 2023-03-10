const badRequest = (message) => ({
  message,
  statusCode: 404,
  stack: Error().stack,
});

module.exports = badRequest;