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
  list: async (req, res) => {
    /*
  #swagger.tags = ["Address"]
  #swagger.summary = "List Address"
  #swagger.description = `
      You can send query with endpoint for search[], sort[], page and limit.
      <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
      </ul>
  `
*/
//* CRUD Processes:

const data = await res.getModelList(Address, filters);

res.status(200).send({
error: false,
details: await res.getModelListDetails(Address, filters),
data,
});},
 
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
            #swagger.tags = ["Addresss"]
            #swagger.summary = "Update Address"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */
            const data = await Address.updateOne({ _id: req.params.id }, req.body, {
              runValidators: true,
            });
        
            res.status(200).send({
              error: false,
              data,
              new: await Address.findOne({ _id: req.params.id }),
            });
},

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
