module.exports = (err, req, res, next) => {
  const statusCode = err?.statusCode || 400;

  res.status(statusCode).json({
    status: "Error",
    message: err?.message || "Something went wrong",
  });
};
