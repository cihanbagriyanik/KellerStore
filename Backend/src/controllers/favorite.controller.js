"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Favorite = require("../models/favorite");
const Ad = require("../models/ad")

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

    const data = await res.getModelList(Favorite);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Favorite),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    console.log(req.body.adId, "favori");
    const userControl = await Ad.find({ userId: req.user._id });
    console.log(userControl, "favori");
    if (userControl.length > 0) {
      userControl?.map((item) => {
        if (item._id == req.body.adId) {
          res.errorStatusCode = 401;
          throw new Error("Please LIKE AYNI HATALI.");
        }
      });
    }
    const fr = await Favorite.findOne({ adId: req.body.adId });
    console.log(fr, "fr");
    console.log(req.user._id);
    try {
      if (!fr) {
        const data = await Favorite.create({
          adId: req.body.adId,
          favorites: [req.user._id],
        }).populete("adId");

        return res.status(200).send({
          data: data.favorites,
          message: "Favori Eklendi",
        });
      } else {
        const data = await Favorite.findOneAndUpdate(
          { adId: req.body.adId },
          fr.favorites.includes(req.user._id)
            ? { $pull: { favorites: req.user._id } }
            : { $addToSet: { favorites: req.user._id } },
          { new: true, runValidators: true },
          { new: true, runValidators: true }
        ).populate("adId");
        return res.status(200).send({
          data: data,
          message: "Favori Güncellendi",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "create bak." });
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
  user : async(req,res)=>{
    const userControl = await Favorite.find({}).populate("adId");
    const data= userControl?.favorites?.filter( (item)=> item == req.user._id );




    res.send({
      message:"ola",
      data
    }
    )

  },

  // belibt: async (req, res) => {
  //   /*
  //     #swagger.tags = ["Favorites"]
  //     #swagger.summary = "Belibts Favorite"
  //     #swagger.description = `
  //       You can send query with endpoint for search[], sort[], page and limit.
  //         <ul> Examples:
  //           <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
  //           <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
  //           <li>URL/?<b>page=2&limit=1</b></li>
  //       </ul>
  //     `
  //   */

  //     try {
  //       const data = await Favorite.find({}).populete("adId");
  //       const sortedData = data.sort((a, b) => {
  //         if (a.favorites && b.favorites) {
  //           return b.favorites.length - a.favorites.length;
  //         }
  //         return 0;
  //       });
    
  //       res.status(200).send({
  //         error: false,
  //         data: sortedData,
  //       });
  //     } catch (error) {
  //       res.status(500).send({
  //         error: true,
  //         message: error.message,
  //       });
  //     };
  // },

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
  belibt: async (req, res) => {
    /*
      #swagger.tags = ["Favorites"]
      #swagger.summary = "Belibts Favorite"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
          <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */
      const data = await Favorite.find({});
      const Data = data.sort((a, b) => b.favorites.length - a.favorites.length);
      res.status(200).send({
        error: false,
        data:Data,
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
