"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Ad = require("../models/ad");
const { Category, Subcategory } = require("../models/category");
const Address = require("../models/address");
const message = require("../models/message");
const { populate } = require("../models/user");
const sendMail = require("../helpers/sendMail");
/* -------------------------------------------------------------------------- */
//? Ad Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "List Ads"
        #swagger.description = `
         Alle Ad
        `
    */
    //console.log("gelfdoddddddddddddd")
    const data = await Ad.find({}).populate('subcategoryId');
    const redu = data.reverse();

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Ad),
      data: redu,
    });
  },

  search: async (req, res) => {
    /*
        #swagger.tags = ["Ads"]
        #swagger.summary = "Search Ads"
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
    /****************************************************************** */
    /********************************************************************** */
    /**********  FARKLI BIR SEARCH METODU BURDA body gelenleri filtreme yapilabilir  */
    // const {keyword,min_price,max_price,page} =req.body
    // if(page <=0) page =1
    // let query ={};
    // keyword ? query.title = new RegExp(keyword,i) :null
    // min_price ? query.price ={['$gte'] : min_price} : null
    // max_price ? query.price ={['$gte'] : max_price} :null
    // min_price && max_price ? query.price ={['$gte'] : min_price ,['$gte'] : max_price} :null
    /************************************************************************************ */
    /************************************************************************************* */
    //console.log(req.query);
    const selectedCategoriesArray = req.query.selectedCategories
      ? req.query.selectedCategories.split(",")
      : [];

    const categories = await Category.find({
      // $in operatörü, MongoDB'de bir alanın belirli bir array'deki herhangi bir değeri içerip içermediğini kontrol etmek için kullanılır.
      categoryName: {
        $in: selectedCategoriesArray.map((cat) => new RegExp(cat, "i")),
      },
    });
    //console.log(categories, "dikkat et");
    const categoryIds = categories.map((category) => category._id.toString());
    // console.log(categoryIds, "category id dikkat");
    const data = await res.getModelList(Ad);
    const sondru = data.filter((item) =>
      categoryIds.includes(item.categoryId.toString())
    );

    res.status(200).json({
      error: false,
      data: req.query.selectedCategories ? sondru : data,
      categories,
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

    //console.log(req.files, "ad resim");
    // console.log(req.user,"userAD")
    //console.log(req.body,"create gelene abak")
    try {
      const { zipCode, street } = req.body;
      if (req.files) {
        req.body.images = req.files.map((file) => file.originalname);
      } else {
        req.body.images = "resimyok.jpeg";
      }
      const data = await Ad.create({ ...req.body });
      const ad = await Address.create({
        userId: req.user._id,
        zipCode: zipCode,
        street: street,
      });
      console.log(ad, "adreskayit");

      sendMail(
        data.email,

        "Your Ad Has Been Added!",

        `
       <h1>Welcome to Keller Store</h1>
        <p>Dear <b>${data.username}</b>, your ad has been added to Keller Store now!</p>
       `
      );

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

    try {
      const data = await Ad.findOne({ _id: req.params.id });

      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Ad not found",
          body: {},
        });
      }

      let veri = data.countOfVisitors + 1; // Ziyaretçi sayısını bir artırıyoruz.
      //data._doc Mongoose belgesinin ham veri nesnesini temsil eder ve bu nesne ile doğrudan çalışarak güncelleme işlemlerini gerçekleştiririz.
      const son = await Ad.findByIdAndUpdate(
        req.params.id,
        { ...data._doc, countOfVisitors: veri },
        { new: true }
      ).populate("userId");

      res.status(200).send({
        error: false,
        son,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
        body: {},
      });
    }
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

    //console.log(req.body, "favorite");
    //console.log(req.params.id);
    try {
      const ad = await Ad.findOne({ _id: req.params.id });
      //console.log(ad);
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
      //console.error("An error occurred during the favorite operation", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  updateRead: async (req, res) => {
    //console.log(req.params.id, "update read gelen");
    const data = await Ad.findOne({ _id: req.params.id });
    const adress = await Address.findOne({ userId: req.user._id });
    //  console.log(req.user)
    // console.log(adress)
    //
    res.send({
      adress,
      data,
      message: "Read updated successfully",
    });
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
    console.log("updateeeeeeeeeeeeeeee");
    const { id } = req.params;
    const userControl = await Ad.find({ userId: req.user._id });
    //console.log(userControl, "usercontollllll");
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
   // console.log(price);

    const data = await Ad.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    if (priceControl.price > price) {
      sendMail(
        req.user.email,
        "Welcome",
        `
          <h1>Welcome to Keller Store</h1>
          <p>Dear <b>${data.priceControl.price}</b>, Mal dustuuuuuuuuuuuu!</p>
       `
      );
    }

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

      res.status(202).send({ message: "Reserve okey", data: updatedAd });
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
