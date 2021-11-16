// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log(err);
  if (!err.status) {
    res.status(500);
    return res.send(err.message);
  }
  res.status(err.status);
  return res.send(err.message);
}

module.exports = errorHandler;
