"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
// $ npm i nodemailer
const nodemailer = require("nodemailer");

/* -------------------------------------------------------------------------- */
//? Sending E-Mail:
module.exports = function (to, subject, message) {
  //? GoogleMail (gmail):
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "msolmaz83@gmail.com",
      pass: "vywc ucau umsy fjhy",
    },
  });
  //console.log(transporter);

  transporter.sendMail(
    {
      to: to,
      subject: subject,
      // Message:
      text: message,
      html: message,
    },
    (error, success) => {
      // error ? console.log("Error:", error) : console.log("Success:", success);
      error ? error : success;
    }
  );
};
