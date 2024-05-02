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
  firebaseId:{
    type: String,
   
    trim: true,
   
  },

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
        type: Date,
      
    },
    tel: {
        type: Number,
      
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    taxNr: {
        type: Number,
      
        unique: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
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
// Schema Configs:


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