class authService {
  static signUpGoogle = async (req, client) => {
    const { token } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
    } catch (e) {
      console.log(e);
    }

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    //create and add user to db
    return payload;
  };
}

module.exports = authService;
