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

    try {
      const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
      const data = await res.getModelList(Follow, filters);
      const details = await res.getModelListDetails(Follow, filters);
      res.status(200).send({
        error: false,
        details,
        data,
      });
    } catch (err) {
      res.send({
        error: true,
        messa: err.message,
      });
    }
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
    try {
      const { followUserId } = req.body;
      req.body.userId = req.user._id;
      const vert = await Follow.find({ userId: req.user._id });
      const followController = vert.some(
        (item) => item.followUserId == followUserId
      );
      if (followController) {
        return res.status(400).send({
          error: true,
          message: "kullanici var.",
        });
      } else {
        const data = await Follow.create(req.body);
        res.status(201).send({
          error: false,
          data,
          vert,
        });
      }
    } catch (err) {
      res.send({
        error: true,
        message: err.message,
      });
    }
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Tek Bir Follow Bilgisi Getir"
    */
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { userId: req.user._id };

      // Tüm follow kayıtlarını userId'ye göre filtrele
      const allFollows = await Follow.find(filters).populate("followUserId");

      // Tek bir follow kaydını id'ye göre bul ve followUserId'yi popüle et
      // const data = await Follow.findOne(filters).populate("followUserId");

      // if (!data) {
      //   return res.status(404).send({
      //     error: true,
      //     message: "Follow kaydı bulunamadı",
      //   });
      // }

      res.status(200).send({
        error: false,
        // data,
        allFollows, // Filtrelenmiş tüm follow kayıtlarını da döndürüyoruz
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: err.message,
      });
    }
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

    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const updateResult = await Follow.updateOne(filters, req.body, {
        runValidators: true,
      });
      if (updateResult.matchedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found",
        });
      }
      const newData = await Follow.findOne(filters).populate(
        "userId followedUserId"
      );
      res.status(202).send({
        error: false,
        data: newData,
      });
    } catch (err) {
      res.send({
        error: true,
        messa: err.message,
      });
    }
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Follows"]
        #swagger.summary = "Delete Follow"
    */
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Follow.deleteOne(filters);
      if (data.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found",
        });
      }
      res.status(204).send();
    } catch (err) {
      res.send({
        error: true,
        messa: err.message,
      });
    }
  },
};
