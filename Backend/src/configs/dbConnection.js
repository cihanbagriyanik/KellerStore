"use strict"
/* -------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function() {
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
var admin = require("firebase-admin");

var serviceAccount = require("./service");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




module.exports = {
    mongoose,
    dbConnection,
    admin
} 