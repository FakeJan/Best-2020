require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

// var { engine } = require('express-handlebars');

require("./app_api/models/db");
require("./app_api/konfiguracija/passport");

//var indexRouter = require('./app_server/routes/index');
var indexApi = require("./app_api/routes/index");

var app = express();

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Goodmeets",
      version: "1.0.0",
      description: "Goodmeets API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://goodmeets.herokuapp.com/api" }
    ]
  },
  apis: [
    "./app_api/models/event_chat.js",
    "./app_api/models/events.js",
    "./app_api/models/uporabnikModel.js",
    "./app_api/routes/index.js"
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

// Preusmeritev na HTTPS na Heroku
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// view engine setup

app.set('views', path.join(__dirname, 'app_server', 'views'));

// app.engine('.hbs', engine({

// }));
// require("./app_server/views/helpers/hbsh.js");

// const helpers = require("./app_server/views/helpers/hbsh");

// app.engine('hbs', engine({
//   extname: 'hbs',
//   defaultLayout: 'layout',
//   layoutsDir: path.join(__dirname, 'app_server', 'views/'),
//   partialsDir: path.join(__dirname, 'app_server', 'views/partials/'),
//   helpers: {
//     date_formatter: helpers.formatDate,
//     if_condition: helpers.ifCond,
//     json: helpers.jsonConvert,
//     if_condition: helpers.ifCond,
//     log: helpers.consoleLog,
//     myMsg: helpers.ifMyMsg,
//     valid_range: helpers.validRange,
//     array_includes: helpers.valueInArray,
//     folder_content: helpers.getFolderContent,
//     time_formatter: helpers.formatDateAndTime
//   }
// }));

// app.engine("handlebars", cons.handlebars());

app.set('view engine', 'hbs');

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.header("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(logger("dev"));

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/ABI", express.static(path.join(__dirname, "app_dapp", "build", "contracts")));
app.use("/web3", express.static(path.join(__dirname, "app_web3")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "@truffle", "contract", "dist")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "web3", "dist")));
app.use(express.static(path.join(__dirname, 'app_public', "build")));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', "build")));

app.use(passport.initialize());

//app.use('/', indexRouter);
app.use("/api", indexApi);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
});

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError")
    res.status(401).json({ sporočilo: err.name + ": " + err.message + "." });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
