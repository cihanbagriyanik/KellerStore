"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Address=require("../models/address")
/* -------------------------------------------------------------------------- */
//? Address Controller:
module.exports = {
  //! GET
  list: async (req, res) => {},

  //* CRUD Processes:
  //! POST
  create: async (req, res) => { /*
  #swagger.tags = ["Addresses"]
  #swagger.summary = "Create Address"
  #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
      }
  }
*/
const data = await Address.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
},

  //! /:id -> GET
  read: async (req, res) => {},

  //! /:id -> PUT / PATCH
  update: async (req, res) => {},

  //! /:id -> DELETE
  delete: async (req, res) => {/*
  #swagger.tags = ["Addresses"]
  #swagger.summary = "Delete Address"
*/

const data = await Address.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });},
};
