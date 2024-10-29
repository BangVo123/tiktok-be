const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const app = require("./src/app");
const socketHandler = require("./src/utils/socket");
require("dotenv").config({ path: "./.env" });

const server = http.createServer(app);

//config socket.io
const io = new Server(server, {
  cors: {
    origins: ["*"],
  },
});

socketHandler(io);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Connect to db success"));

server.listen(process.env.PORT, () =>
  console.log(`Server listening request on port ${process.env.PORT}`)
);
