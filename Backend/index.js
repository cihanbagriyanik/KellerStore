"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
/*
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors morgan jsonwebtoken swagger-autogen swagger-ui-express redoc-express nodemailer
    
    // $ touch .env
    $ touch .gitignore
    https://www.toptal.com/developers/gitignore  (“node”) then copy paste
    
    $ mkdir logs
    $ nodemon
*/
/* -------------------------------------------------------------------------- */
//? Required Modules:
const express = require("express");
const app = express();

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* -------------------------------------------------------------------------- */
//? Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* -------------------------------------------------------------------------- */
//? Middlewares:

// Accept JSON:
app.use(express.json());

// Check Token:
app.use(require("./src/middlewares/authentication"));

// morgan-logger:
// app.use(require("./src/middlewares/logger")); //!It will be in Comment coz of Deployment

// res.getModelList:
app.use(require("./src/middlewares/findSearchSortPage"));

/* -------------------------------------------------------------------------- */
//? Routes:
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Keller Store",
    isLogin: req.isLogin,
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routers"));

/* -------------------------------------------------------------------------- */
//? errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* -------------------------------------------------------------------------- */


app.use("/images",express.static("./uploads"))
// Bu kod, http://example.com/images URL'sine yapılan istekleri, sunucunun ./uploads dizinindeki dosyalara yönlendirir. Yani, istemci tarafından /images yoluna yapılan bir HTTP GET isteği, sunucu tarafından ./uploads dizinindeki dosyalara çözümlenir.

// Bu genellikle resim dosyaları, stil dosyaları veya istemci tarafından talep edilen diğer statik içerikleri sunucunun dışında bir klasörde depolamak için kullanılır. Bu, sunucunun daha hafif olmasına ve talep edilen dosyaların doğrudan sunucu tarafından sağlanmasına olanak tanır, böylece her istek için dinamik içerik üretme ihtiyacı ortadan kalkar



//? RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */
//? Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clears database.
