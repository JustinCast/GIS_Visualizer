const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// API file for interacting with MongoDB
const api = require("./routes/api");

/**
 * Server config
 */
function config() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}

/**
 * Endpoints Config
 */
function routerConfig() {
  app.use("/api/v1", api);
} 

// functions invocations
config();
routerConfig();

//Set Port
app.listen(process.env.PORT || 8080);