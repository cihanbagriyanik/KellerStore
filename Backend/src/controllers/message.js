"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Message = require("../models/message");
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
    });
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
    const { adId, message } = req.body;
    console.log(adId, message);
    try {
      const ad = await Ad.findById(adId);
      console.log(ad);
      if (!ad) return res.status(404).json({ message: "Ad not found" });
      console.log(ad.userId);

      const receiverUserId = ad.userId;
      console.log(receiverUserId);
      const senderUserId = req.user._id;
      console.log(senderUserId, "alici");

      const existingMessage = await Message.findOne({ senderUserId });
      const reccontrol = await Message.findOne({ receiverUserId });
      console.log(reccontrol, "kontrol");
      console.log(existingMessage, "alocii");
      if (!existingMessage) {
        console.log("icerde");
        const newMessage = new Message({
          adId,
          senderUserId,
          receiverUserId,
          message: {
            senderUserId,
            content: message, // Mesaj içeriğini content olarak adlandıralım
          },
        });
        await newMessage.save();
        res.status(201).json({ message: "Message sent" });
      } else if (existingMessage && reccontrol) {
        const son = await Message.findOne({ adId });
        if (son) {
          son.message.push({
            senderUserId,
            content: message, // Mesaj içeriğini content olarak adlandıralım
          });
          await son.save();
          res.status(201).json({ message: "Message updated and sent." });
        } else {
          // Eğer 'son' bulunamazsa, hata mesajı gönder
          res.status(404).json({ message: "No relevant message found." });
        }
      } else {
        await existingMessage.message.push(message);
        await existingMessage.save();
        res.status(201).json({ message: "Message sent update" });
      }
    } catch {
      res.status(500).json({ message: "Error sending message" });
    }
  },
  recer: async (req, res) => {
    try {
      const { message } = req.body;
      const { id } = req.params;
      console.log(id);

      const veri = await Message.findOne({ senderUserId: id });

      if (!veri) {
        console.log("Belirtilen senderUserId'ye sahip kayıt bulunamadı.");
      } else {
        console.log(veri, "veriii");
        const rece = req.user._id;
        console.log(req.body.message);
        console.log(rece);
        await veri.message.push({ rece, content: message });
        await veri.save();
        res.send({
          message: "OKEY",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
  delete: async (req, res) => {
    /*
  #swagger.tags = ["Messages"]
  #swagger.summary = "Delete Message"
*/

    const data = await Message.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
