const express = require("express");

const loadMiddlewares = require("./loaders/middlewares");
const loadRoutes = require("./loaders/routes");
const loadDatabase = require("./loaders/database");

const app = express();

loadMiddlewares(app);
loadRoutes(app);
loadDatabase();

module.exports = app;