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
  firebaseId:{
    type: String,
   
    trim: true,
   
  },

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
        required: true,
      
        
    },
    avatar: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date
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
        
    },
    isPremium: {
        type: Boolean,
        default: false,
        
    },
    taxNr: {
        type: Number,
        required: true,
        unique: true
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
        required: true
    },
    future: {
        type: String,
        required: true
    }
}, { collection: 'users', timestamps: true })


/* ------------------------------------------------------- */

/* Email and Password Validation */

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