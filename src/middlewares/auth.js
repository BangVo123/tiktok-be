const passport = require("passport");

const authMiddleware = (provider) => {
  return passport.authenticate(provider, { scope: ["email", "profile"] });
};

const authCallbackMiddleware = (provider) => {
  return passport.authenticate(provider, { session: true });
};

module.exports = { authMiddleware, authCallbackMiddleware };
