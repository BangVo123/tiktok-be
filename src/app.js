const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config({ path: "./.env" });

const errorController = require("./controllers/errorController");
const AppError = require("./utils/error");
const route = require("./routes/index");
require("./utils/auth");

const app = express();

//protect http header
app.use(helmet());

//use morgan to log request
app.use(morgan("dev"));
//format value from request must be json
app.use(express.json());

//cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate("session"));

//Define route here
app.use("/", route);

//Throw error with rules does not define
app.all("*", (req, res, next) => {
  const err = new AppError("Not exists route", 404);
  next(err);
});

//Handle error here
app.use(errorController);

module.exports = app;
