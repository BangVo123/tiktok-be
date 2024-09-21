module.exports = (err, req, res, next) => {
  const statusCode = err?.statusCode || 400;
  console.log(err);

  res.status(statusCode).json({
    status: "Error",
    message: err?.message || "Something went wrong",
  });
};
