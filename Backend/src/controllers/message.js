"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Message=require("../models/message")
/* -------------------------------------------------------------------------- */
//? Message Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
  #swagger.tags = ["Message"]
  #swagger.summary = "List Message"
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

const data = await res.getModelList(Message, filters);

res.status(200).send({
error: false,
details: await res.getModelListDetails(Message, filters),
data,
});},
 
  //! POST
  create: async (req, res) => { /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Create Message"
  #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
      }
  }
*/
const data = await Message.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
},

  //! /:id -> GET
  read: async (req, res) => {
     /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Get Single Message"
*/
const data = await Message.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
},

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
   /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Update Message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */
            const data = await Message.updateOne({ _id: req.params.id }, req.body, {
              runValidators: true,
            });
        
            res.status(200).send({
              error: false,
              data,
              new: await Message.findOne({ _id: req.params.id }),
            });
},

  //! /:id -> DELETE
  delete: async (req, res) => {/*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Delete Message"
*/

const data = await Message.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });},
};
