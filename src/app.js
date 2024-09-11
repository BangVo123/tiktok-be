const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
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

app.enable("trust proxy", 1);

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//format value from request must be json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: false,
      // path: "/",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
