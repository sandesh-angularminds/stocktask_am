const epxress = require("express");
const dotenv = require("dotenv");
const app = epxress();
const routes = require("./routes");
const { status: httpStatus } = require("http-status");
const ApiError = require("./utils/ApiError");
const config = require('./config/config')
const cors = require("cors");
const BASE_URL =config.baseUrl;

//json format
app.use(epxress.json());

//cors policy
app.use(cors({ allowedHeaders: "*" }));
//routes
app.use(`/`, routes);

//global error handling
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//global error handler
const errorHandler = (err, req, res, next) => {
  const { statusCode = 400, message } = err;
  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };
  res.status(statusCode).send(response);
};

app.use(errorHandler);

module.exports = app;
