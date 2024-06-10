"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Message = require("../models/message");
const Ad = require("../models/ad");
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

    try {
      const filters = req.user?.isAdmin ? {} : { participants: req.user._id };

      const threads = await Message.find(filters).populate(
        "participants messages.senderId"
      );

      res.status(200).send({
        error: false,
        data: threads,
      });
    } catch (err) {
      res.status(400).send({
        mesage: "list problem",
        error: true,
        data: err,
      });
    }
  },

  //! POST

  create: async (req, res) => {
    /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Create Message"
  #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        adId:"00000000000000",
        message:"word"
      }
  }
*/
//burdaki mantik bir tane iki kisini olacagi bir grup kurduk ordan haberlerstiktik
    try {
      const { adId, message } = req.body;
      const ad = await Ad.findById(adId);
      console.log(ad, "aaaaaaaaaaaaaaaa");
      if (!ad) {
        return res.status(404).send({
          error: true,
          message: "Ad not found.",
        });
      }
     
      const senderId = req.user._id; // kullanici
      console.log(senderId, "sender");

      let thread = await Message.findOne({
        adId: adId,
        // MongoDB sorgusunda { $all: [senderId, ad.userId] } ifadesi, participants dizisinin senderId ve ad.userId değerlerinin her ikisini de içermesi gerektiğini belirtir. Bu sorgu, participants alanında belirtilen iki değeri de içeren belgeleri bulmak için kullanılır.
        participants: { $all: [senderId, ad.userId] },
      });

      console.log(ad.userId, "ad ownert");
      
      if (!thread && senderId.toString() === ad.userId.toString()) {
        
        return res.status(400).send({
          error: true,
          message: "You cannot send a message to your own ad.",
        });
      }
      console.log(thread, "thraaaa conrrol");
      
      if (!thread) {
        thread = await Message.create({
          participants: [senderId, ad.userId],
          adId: adId,
          messages: [
            {
              senderId: senderId,
              messageText: message,
            },
          ],
        });
      } else {
      
        if (!thread.participants.includes(senderId)) {
          await Message.updateOne(
            { _id: thread._id },
            { $addToSet: { participants: senderId } }
          );
        }

     
        await Message.updateOne(
          { _id: thread._id },
          { $push: { messages: { senderId: senderId, messageText: message } } }
        );
      }

      res.status(201).send({
        error: false,
        data: thread,
      });
    } catch (err) {
      res.send({
        err: err.message,
        mesage: "messaj hata",
      });
    }
  },
  //! /:id -> GET
  read: async (req, res) => {
    /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Get Single Message"
*/
    try {
      const messageId = req.params.id;
      const thread = await Message.findById(messageId).populate(
        "participants messages.senderId"
      );

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Message thread not found.",
        });
      }

      res.status(200).send({
        error: false,
        data: thread,
      });
    } catch (err) {
      res.status(400).send({
        message: "read problem",
        error: true,
        data: err,
      });
    }
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
               
                  message: "Hello World",
                  senderId: "0000000000"
                }
            }
        */
    try {
      const threadId = req.params.id;
      const { message, senderId } = req.body;

      const thread = await Message.findOne({
        _id: threadId,
        participants: { $in: [req.user._id] },
      });

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Thread not found or you do not have permission to update.",
        });
      }

      // Append the new message to the messages array within the found thread
      thread.messages.push({ senderId: senderId, messageText: message });
      await thread.save();

      res.status(202).send({
        error: false,
        data: thread,
      });
    } catch (err) {
      next(err);
    }
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Delete Message"
     #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  threadId:"000000"
                }
            }
*/

    try {
      const threadId = req.params.id;
      const result = await Message.findOneAndDelete({
        _id: threadId,
        participants: { $in: [req.user._id] }, // Ensure user is a participant
      });

      if (!result) {
        return res.status(404).send({
          error: true,
          message:
            "No such message thread found, or you don't have permission to delete it.",
        });
      }

      res.status(204).send(); // No content to send back but signifies successful deletion
    } catch (err) {
      res.status(400).send({
        mesage: "delete problem",
        error: true,
        message: err.message,
      });
    }
  },
};
