"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Favorite = require("../models/favorite");

/* -------------------------------------------------------------------------- */
//? Favorite Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "List Favorite"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
          <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */

    const data = await res.getModelList(Favorite, filters);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Favorite, filters),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "Create Favorite"
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {}
      }
    */

      console.log(req.body, "favori");

      try {
          const data = await Favorite.findOneAndUpdate(
              { adId: req.user.adId },
              {
                  $addToSet: { favorite: req.body.userId },
                  $pull: { favorite: req.body.userId }
              },
              { upsert: true, new: true } // new: true ile güncellenmiş belgeyi döndür
          );
  
          res.status(200).send({
              message: "Favori işlemi başarılı.",
              data: data
          });
  
      } catch (error) {
          res.status(500).send({
              message: "Favori işlemi başarısız."
          });
      }
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "Get Single Favorite"
    */

    const data = await Favorite.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "Update Favorite"
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {}
      }
    */

    const data = await Favorite.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      data,
      new: await Favorite.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "Delete Favorite"
    */

    const data = await Favorite.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
