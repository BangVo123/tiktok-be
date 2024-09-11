const nodemailer = require("nodemailer");

const sendMail = async (auth, option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth,
  });

  const resp = await transporter.sendMail(option);
  return resp;
};

module.exports = sendMail;
