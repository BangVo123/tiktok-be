const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config({ path: "./.env" });

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Connect to db success"));

server.listen(process.env.PORT, () =>
  console.log(`Server listening request on port ${process.env.PORT}`)
);
