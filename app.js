const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const dataPointsRouter = require("./routes/datapoints");

const app = express();

// Connecting to MongoDB
/**
 * Tt will create or use(if already exists) a collection named "heatmap".
 * It is specified in connection string, and add documents (data) into it, under table name "datapoints".
 */
mongoose
  .connect(
    "mongodb+srv://rentsy:rentsy123@cluster0.wagfk.mongodb.net/heatmap?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB....", err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public"))); // Used to reference to static files of JS, CSS and Images

// Route links for homepage and datapoints
app.use("/", indexRouter);
app.use("/datapoints", dataPointsRouter);

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
  res.send("error");
});

module.exports = app;
