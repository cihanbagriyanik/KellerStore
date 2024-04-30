"use strict"

const { mongoose } = require("../configs/dbConnection")

/* -------------------------------------------------------------------------- 
// {
//         "firstName": "user3",
    "lastName": "user3",
    "userName": "user3",
    "businessName": "1234567877",
    "email": "user3@example.com",
    "password": "Secure*1234",
    "dateOfBirth": "1982-01-01",
    "tel": "1234567897",
    "isActive": true,
    "isAdmin": false,
    "isBusiness": false,
    "isPremium": false,
    "taxNr": 12345675541,
    "startDate": "2021-01-01",
    "endDate": "2025-01-01",
    "future": "Some future info3"
// }
-------------------------------------------------------------------------- */



// User Model:

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
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
        required: true
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
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    isBusiness: {
        type: Boolean,
        default: false,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false,
        required: true
    },
    taxNr: {
        type: Number,
        required: true,
        unique: true
    },
    isStaff: {
        type: Boolean,
        default: false,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    future: {
        type: String,
        required: true
    }
}, { collection: 'users', timestamps: true })


/* ------------------------------------------------------- */
// Schema Configs:

const passwordEncrypt = require('../helpers/passwordEncrypt')

UserSchema.pre(['save', 'updateOne'], function (next) {

    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this

    // email@domain.com
    const isEmailValidated = data.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
        : true

    if (isEmailValidated) {

        if (data?.password) {

            // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

            if (isPasswordValidated) {

                this.password = data.password = passwordEncrypt(data.password)
                this._update = data // updateOne will wait data from "this._update".

            } else {

                next(new Error('Password not validated.'))
            }
        }

        next() // Allow to save.

    } else {

        next(new Error('Email not validated.'))
    }
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)