"use strict"

const { mongoose } = require("../configs/dbConnection")

/* -------------------------------------------------------------------------- 
// {
//  "firstName": "user3",
    "lastName": "user3",
    "userName": "user3",
    "businessName": "1234567877",
    "email": "user3@example.com",
    "password": "Secure*1234",      
    "isActive": true,
    "isAdmin": false,
    
// }
-------------------------------------------------------------------------- */



// User Model:

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        
    },
    lastName: {
        type: String,
        trim: true,
        
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    businessName: {
        type: String,
        
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date,
       
    },
    tel: {
        type: Number,
        
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    isBusiness: {
        type: Boolean,
        default: false,
        
    },
    isPremium: {
        type: Boolean,
        default: false,
        
    },
    taxNr: {
        type: Number,
        unique: true,
        
    },
    isStaff: {
        type: Boolean,
        default: false,
        
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    startDate: {
        type: Date,
        
    },
    endDate: {
        type: Date,
        
    },
    future: {
        type: String,
        
    }
}, { collection: 'users', timestamps: true })


/* ------------------------------------------------------- */

/* Email and Password Validation */

const emailAndPassValidation = require('../helpers/emailAndPassValidation');

UserSchema.pre(['save', 'updateOne'], function (next) {
  // get data from "this" when create;
  // if process is updateOne, data will receive in "this._update"
  const data = this?._update || this;

  emailAndPassValidation(data, next);
});

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)