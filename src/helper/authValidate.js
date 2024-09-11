function isEmail(payload) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(payload);
}

function isPhoneNumber(payload) {
  const regex = /^(03|05|07|08|09)\d{8}$/;
  return regex.test(payload);
}

module.exports = { isEmail, isPhoneNumber };
