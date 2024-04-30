const passwordEncrypt = require('./passwordEncrypt');

const emailAndPassValidation = (data, next) => {
  // email@domain.com
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
    : true;

  if (isEmailValidated) {
    if (data?.password) {
      // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
      const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password);

      if (isPasswordValidated) {
        data.password = passwordEncrypt(data.password);
      } else {
        return next(new Error('Password not validated.'));
      }
    }

    next(); // Allow to save.
  } else {
    next(new Error('Email not validated.'));
  }
};

module.exports = emailAndPassValidation;
