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
<<<<<<< HEAD
        type: Date
=======
        type: Date,
      
>>>>>>> 1931046c540e7581bc800b2fa2c26c6cffaef149
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
      
    },
    future: {
        type: String,
      
    }
}, { collection: 'users', timestamps: true })


/* ------------------------------------------------------- */

/* Email and Password Validation */


UserSchema.pre(['save', 'updateOne'], function (next) {

    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this

    // email@domain.com
    const isEmailValidated = data.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
        : true

    if (isEmailValidated) {

          next() // Allow to save.
        }

      

    else {

        next(new Error('Email not validated.'))
    }
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)