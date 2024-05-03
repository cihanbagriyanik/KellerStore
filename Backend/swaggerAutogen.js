"use strict";
/* --------------------------------------------------------------------------
	* NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

/* -------------------------------------------------------------------------- */
const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    termsOfService: "www.linkedin.com/in/bagriyanik",
    contact: { name: packageJson.author, email: "cihanbagriyanikde@gmail.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Simple Token Authentication * Example: <b>Token ...tokenKey...</b>",
    },
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "JWT Authentication * Example: <b>Bearer ...accessToken...</b>",
    },
  },
  security: [{ Token: [] }, { Bearer: [] }],
  definitions: {
    // Models:
    User: require("./src/models/user").schema.obj,
    ad: require("./src/models/ad").schema.obj,
    address: require("./src/models/address").schema.obj,
    category: require("./src/models/category").schema.obj,
    favorite: require("./src/models/favorite").schema.obj,
    follow: require("./src/models/follow").schema.obj,
    message: require("./src/models/message").schema.obj,
    notification: require("./src/models/notification").schema.obj,
  },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

/* -------------------------------------------------------------------------- */
// Create JSON file:
swaggerAutogen(outputFile, routes, document);

/* -------------------------------------------------------------------------- */
//! $ node swaggerAutogen.js
