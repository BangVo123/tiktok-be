const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config({ path: "./.env" });

const server = http.createServer(app);

mongoose
  .connect("mongodb://localhost:27017/Tiktok")
  .then(console.log("Connect to db success"));

server.listen(process.env.PORT, "127.0.0.1", () =>
  console.log(`Server listening request on port ${process.env.PORT}`)
);
