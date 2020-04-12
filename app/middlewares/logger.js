module.exports = (logger) => {
  return (req, res, next) => {
    req.logger = logger;
    return next();
  };
};
