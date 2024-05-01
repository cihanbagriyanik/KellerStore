"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");
const { admin } = require("../configs/dbConnection");
const mongoose = require("mongoose");
const { ObjectId } = require('mongoose').Types;
/* -------------------------------------------------------------------------- */
module.exports = {
  register: async (req, res) => {
    
    try {
      const userResponse = await admin.auth().createUser({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      });
  
      if (userResponse) {
        const isValidObjectId = ObjectId.isValid(userResponse.uid);
  
        let userId;
        if (isValidObjectId) {
          console.log("Verilen değer zaten bir ObjectID.");
          userId = new ObjectId(userResponse.uid); // Zaten bir ObjectID ise doğrudan kullanabiliriz
        } else {
          console.log("Verilen değer bir ObjectID değil, dönüştürülüyor...");
          userId = new ObjectId(); // Yeni bir ObjectID oluşturabiliriz
          console.log(userId ,"gumledi")
        }
        console.log(userId);
  
        const user = new User({
          _id: userId,
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: passwordEncrypt(req.body.password),
        });
  
        // Veriyi MongoDB'ye kaydediyoruz.
        const data = await user.save();
        res.send({
          data,
          success: true,
          message: "User created successfully",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  //! POST
  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
        _swagger.deprecated = true
        _swagger.ignore = true
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "password": "1234",
            }
        }
    */
    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ username });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          //* -------------------------------------------------------------------------- */
          //* TOKEN */
          let tokenData = await Token.findOne({ userId: user._id });

          if (!tokenData) {
            const tokenKey = passwordEncrypt(user._id + Date.now());

            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }

          //* TOKEN */
          /* -------------------------------------------------------------------------- */
          //* JWT */
          const accessData = user.toJSON();
          const accessTime = "30m";
          const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
            expiresIn: accessTime,
          });

          const refreshData = { id: user._id, password: user.password };
          const refreshTime = "3d";
          const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
            expiresIn: refreshTime,
          });

          //* JWT */
          //! Response for TOKEN and JWT
          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: {
              access: accessToken,
              refresh: refreshToken,
            },
            user,
          });
          //* -------------------------------------------------------------------------- */
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Please enter username and password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username and password.");
    }
  },

  gofatel:async(req,res)=>{
    const {google,facebook,telefon} = req.body
    //console.log(req.body)
    
    try {
      if(google && !facebook && !telefon){
           console.log(google?.email,"google")
          const user = await  User.findOne({ email:google.email})

             if(user){
              res.send({
             
              error: false,
              message: "User found",
              data: user,
            });
             }


            
             else if(!user){
              const isValidObjectId = ObjectId.isValid(google.uid);
  
              let userId;
              if (isValidObjectId) {
                console.log("Verilen değer zaten bir ObjectID.");
                userId = new ObjectId(google.uid); // Zaten bir ObjectID ise doğrudan kullanabiliriz
              } else {
                console.log("Verilen değer bir ObjectID değil, dönüştürülüyor...");
                userId = new ObjectId(); // Yeni bir ObjectID oluşturabiliriz
                console.log(userId ,"gumledi")
              }
              console.log(userId);
        
              const user = new User({
                _id: userId,
                name: google.displayName,
                email: google.email,
                username:  google.displayName,
                password: passwordEncrypt(google.displayName),
              });
        
              // Veriyi MongoDB'ye kaydediyoruz.
              const data = await user.save();
              res.send({
                data,
                success: true,
                message: "User created successfully",
              });
            }
            else{
             res.status(400).send({
               success:false,
               message:"user dont find"
             })
            }

      }else{
         res.send({
          succes:"false"
         })
      }
          
          
          
          
          


    } catch (error) {
      console.log(error)
    }
  },


  //! POST
  refresh: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'JWT: Refresh'
        #swagger.description = 'Refresh accessToken with refreshToken'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                bearer: {
                    refresh: '...refreshToken...'
                }
            }
        }
    */

    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      const jwtData = await jwt.verify(refreshToken, process.env.REFRESH_KEY);

      if (jwtData) {
        const { id, password } = jwtData;

        if (id && password) {
          const user = await User.findOne({ _id: id });

          if (user && user.password == password) {
            if (user.isActive) {
              // JWT AccessToken:
              const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_KEY,
                { expiresIn: "30m" }
              );

              res.status(200).send({
                error: false,
                bearer: {
                  access: accessToken,
                },
              });
            } else {
              res.errorStatusCode = 401;
              throw new Error("This account is not active.");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error("Wrong id or password.");
          }
        } else {
          res.errorStatusCode = 401;
          throw new Error("There is not id and password in refreshToken.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT accessToken expires.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh");
    }
  },

  //! GET
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "SimpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    const tokenData = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Logged Out",
      data: tokenData,
    });
  },
};
