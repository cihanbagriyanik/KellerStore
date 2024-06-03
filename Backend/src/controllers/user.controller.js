"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const User = require("../models/user");
const Token = require("../models/token");
const Ad = require("../models/ad");
const Adress = require("../models/address");
const Follow = require("../models/follow");
const passwordEncrypt = require("../helpers/passwordEncrypt");

/* -------------------------------------------------------------------------- */
//? User Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "List Users"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
    const filters = req.user?.isAdmin ? {} : { _id: req.user._id };
    const data = await res.getModelList(User, filters);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User, filters),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  "firstName": "test-1",
                  "lastName": "test-1",
                  "userName": "test-1",
                  "businessName": "1234567877",
                  "email": "test1@example.com",
                  "password": "Secure*1234",
                }
            }
    */

    req.body.isActive = true;
    req.body.isBusiness = req.body.isBusiness || false;
    req.body.isPremium = req.body.isPremium || false;
    const data = await User.create(req.body);
    const tokenData = await Token.create({
      userId: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });
    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
    */

    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    const data = await User.findOne(filters);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  "firstName": "test-1",
                  "lastName": "test-1",
                  "userName": "test-1",
                  "businessName": "1234567877",
                  "email": "test1@example.com",
                  "password": "Secure*1234",
                }
            }
    */

    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    req.body.isAdmin = req.user?.isAdmin ? req.body.isAdmin : false;
    const data = await User.updateOne(filters, {...req.body}, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await User.findOne(filters),
    });
  },

  //! /:id -> PUT / PATCH
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
    */
    //console.log(req.params, "delete");
    //console.log(req.user);
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    //console.log(filters, "filters");

    await Ad.deleteOne({ userId: filters });
    await Adress.deleteOne({ userId: filters });
    await Follow.deleteOne({ userId: filters });
    const data = await User.deleteOne(filters);

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
      message: "AD,ADRESS,FOLLOW DELETE",
    });
  },
};
