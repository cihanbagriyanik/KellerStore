"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Notification = require("../models/notification");

/* -------------------------------------------------------------------------- */
//? Notification Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Notifications"]
        #swagger.summary = "List Notifications"
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

    const data = await res.getModelList(Notification);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Notification),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Notifications"]
        #swagger.summary = "Create Notification"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    // !
                }
            }
    */
    const data = await Notification.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Notifications"]
        #swagger.summary = "Get Single Notification"
    */

    const data = await Notification.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Notifications"]
        #swagger.summary = "Update Notification"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                      //!
                }
            }
    */

    const data = await Notification.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Notification.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Notifications"]
        #swagger.summary = "Delete Notification"
    */

    const data = await Notification.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
