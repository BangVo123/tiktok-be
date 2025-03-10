const jwt = require("jsonwebtoken");

const signAToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET);
};

const signFToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);
};

const verifyAToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    return payload;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const verifyFToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    return payload;
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { signAToken, signFToken, verifyAToken, verifyFToken };
