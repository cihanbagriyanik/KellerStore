"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Address = require("../models/address");
/* -------------------------------------------------------------------------- */
//? Address Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Addresses"]
        #swagger.summary = "List Addresses"
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
        const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
        const data = await res.getModelList(Address, filters);

    

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Address),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
      #swagger.tags = ["Addresses"]
      #swagger.summary = "Create Address"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
          schema:{
                   "street": "example Stert",
                   "zipCode": "135",
                   "city": "Example City",
                   "country": "Example Country",
                   "doorBellName": "Apt. 1"
                  }
      }
    */

    const userId = req.user._id;
    console.log(userId);
    const data = await Address.create({ ...req.body, userId: req.user._id });
    res.send({
      mesage: "okey",
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Addresses"]
        #swagger.summary = "Get Single Address"
    */

    const data = await Address.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Addresses"]
        #swagger.summary = "Update Address"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  zipCode:"test00000"
                }
            }
    */

    const { id } = req.params;
    const data = await Address.findByIdAndUpdate(
      id,
      { ...req.body, userId: req.user._id },
      { new: true }
    );
    res.status(200).send({
      message: "okey",
      data,
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Addresses"]
      #swagger.summary = "Delete Address"
    */

    const data = await Address.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
