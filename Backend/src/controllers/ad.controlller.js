"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Ad = require("../models/ad");
const message = require("../models/message");
const { populate } = require("../models/user");
//const sendMail = require("../helpers/sendMail");
/* -------------------------------------------------------------------------- */
//? Ad Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "List Ads"
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

    const data = await Ad.find({});
    const redu = data.reverse()

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Ad),
      data:redu
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Create Ad"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "ad":"image"
                    "userId": "000000000"
                    "categoryId": "000000000"
                    "title": "title",
                    "addressId": "000000000",
                    "price": "0.00",
                    "offerType": true
                }
            }
    */

    console.log(req.files, "ad resim");
    //console.log(req.user,"userAD")

    try {
      if (req.files) {
        req.body.images = req.files.map((file) => file.originalname);
      } else {
        req.body.images = "resimyok.jpeg";
      }

      const data = await Ad.create({ ...req.body});

      //sendMail(
      // to:
      //  data.email,
      // subject:
      // "Your Ad Has Been Added!",
      // Message:
      // `
      //  <h1>Welcome to Keller Store</h1>
      //   <p>Dear <b>${data.username}</b>, your ad has been added to Keller Store now!</p>
      //  `
      //);

      res.status(201).send({
        error: false,
        data,
      });
    } catch (error) {
      res.send({
        message: error.message,
        error: true,
      });
    }
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Get Single Ad"
    */

    const data = await Ad.findOne({ _id: req.params.id });
    let veri = data.countOfVisitors++;

    const son = await Ad.findByIdAndUpdate(
      { _id: req.params.id },
      { ...data, countOfVisitors: veri },
      { new: true }
    ).populate("userId");
   // populate({path:"userId",select:"usernama"})

    res.status(200).send({
      error: false,
      son
    });
  },
  favorite: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Update Ad"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "000000000"
                    
                }
            }
    */

    console.log(req.body, "favorite");
    console.log(req.params.id);
    try {
      const ad = await Ad.findOne({ _id: req.params.id });
      console.log(ad);
      if (!ad) {
        return res.status(404).send({ message: "Ad not found" });
      }

      // Kullanıcı favori listesinde mi kontrol et
      const isFavorite = ad.favorite.includes(req.body.userId);

      // $addToSet ve $pull operatörlerini kullanarak favori listesini güncelle
      const updateQuery = isFavorite
        ? { $pull: { favorite: req.body.userId } }
        : { $addToSet: { favorite: req.body.userId } };

      // Favori listesini güncelle
      const updatedAd = await Ad.findOneAndUpdate(
        { _id: req.params.id },
        updateQuery,
        { new: true }
      );

      if (!updatedAd) {
        return res.status(500).send({ message: "Failed to update favorite" });
      }

      return res.send({
        message: isFavorite ? "Moved to favorites" : "Added to favorites",
        data: updatedAd,
      });
    } catch (error) {
      console.error("An error occurred during the favorite operation", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Update Ad"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "000000000"
                    "categoryId": "000000000"
                    "title": "title",
                    "addressId": "000000000",
                    "price": "0.00",
                    "offerType": true
                        }
            }
    */
    const { id } = req.params;
    const userControl = await Ad.find({ userId: req.user._id });
    console.log(userControl, "usercontollllll");
    // Eğer dizide en az bir öğe koşulu sağlarsa, some metodu true döner, aksi takdirde false döner.
    const isUserAd = await userControl.some(
      (item) => item._id.toString() == id
    );
    if (!isUserAd) {
      return res.status(403).send({
        error: true,
        message: "ne ayaksin adamim .",
      });
    }

    if (req.files) {
      req.body.images = req.files.map((file) => file.originalname);
    } else {
      req.body.images = "resimyok.jpeg";
    }
    const priceControl = await Ad.findById({ _id: req.params.id });

    console.log(priceControl, "pricecontrol");
    const { price } = req.body;
    console.log(price);

    const data = await Ad.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    // if (priceControl.price > price) {
    //sendMail(
    // to:
    //  req.user.email,
    // subject:
    //   "Welcome",
    // Message:
    // `
    //       <h1>Welcome to Keller Store</h1>
    //       <p>Dear <b>${data.priceControl.price}</b>, Mal dustuuuuuuuuuuuu!</p>
    //    `
    // );
    //}

    res.status(202).send({
      error: false,
      new: await Ad.findOne({ _id: req.params.id }), //buna gerek yok new true yapildigindan
    });
  },
  neue: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Neues Ad"
        #swagger.description = "Neues Ad"
      
    */
    const data = await Ad.find({}).sort({ createdAt: -1 });

    res.status(202).send({ message: "reduce Okey", data });
  },
  view: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Viemss Ad"
        #swagger.description = "MostViem Ad"
      
    */
    const data = await Ad.find({}).sort({ countOfVisitors: -1 });
    res.status(202).send({ message: "most viem Okey", data });
  },

  reserve: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "reserve Ad"
        #swagger.description = "MostViem Ad"
         schema: {
                    "adId": "000000000"
                
                  }
      
    */

    try {
      const { id } = req.params;

      const ad = await Ad.findById(id);
      if (!ad) {
        return res.status(404).send({ message: "Ad not found" });
      }
      ad.isReserved = !ad.isReserved;
      ad.reservedDate = ad.isReserved ? new Date() : null;
      const updatedAd = await ad.save();

      res
        .status(202)
        .send({ message: "Reserve okey", data: updatedAd });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Delete Ad"
    */

    const data = await Ad.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
