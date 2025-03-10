class SuccessResponse {
  constructor({ status, message, metadata = {} }) {
    (this.status = status || 200),
      (this.message = message || "OK"),
      (this.metadata = metadata);
  }

  send(res) {
    res.status(this.status).json(this);
  }
}

module.exports = SuccessResponse;
