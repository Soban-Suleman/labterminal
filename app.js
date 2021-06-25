const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");
const flash = require("express-flash");
const passport = require("passport");

//Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");

const app = express();
require("./db/connection");


//Passport Configuration
const passportConfig = require("./app/config/passport");
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(cors());

const static_path = path.join(__dirname, "./public");
const views_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);
hbs.registerHelper("json", function (obj) {
  return JSON.stringify(obj);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(function (req, res, next) {
  // Permission to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  //res.setHeader("Content-Type", "text/plain");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

// Add headers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;