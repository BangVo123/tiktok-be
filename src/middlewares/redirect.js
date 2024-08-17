const redirect = (req, res) => {
  return res.redirect(process.env.CLIENT_URL);
};

module.exports = redirect;
