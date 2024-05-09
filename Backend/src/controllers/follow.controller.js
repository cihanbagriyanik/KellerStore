"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Follow = require("../models/follow");

/* -------------------------------------------------------------------------- */
//? Follow Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "List Follows"
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

    const data = await res.getModelList(Follow);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Follow),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Create Follow"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId" : "000000000"
                    "followUserId" : "000000000"
                    "favorite" : false
                }
            }
    */
    const data = await Follow.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Get Single Follow"
    */

    const data = await Follow.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Update Follow"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId" : "000000000"
                    "followUserId" : "000000000"
                    "favorite" : false
                }
            }
    */

    const data = await Follow.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Follow.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Delete Follow"
    */

    const data = await Follow.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
