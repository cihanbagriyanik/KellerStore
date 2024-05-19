"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Keller Store
----------------------------------------------------------------------------- */
//? Requaring
const Category = require("../models/category");
const slugify = require("slugify");
const message = require("../models/message");

//slugify, bir npm paketi olarak kullanılır ve metinleri URL dostu slug'lara dönüştürmek için kullanılır. "Slug" genellikle web sayfalarının URL'lerinde kullanılan kısa ve okunabilir metin parçasıdır. Sluglar, SEO (Arama Motoru Optimizasyonu) ve kullanıcı dostu URL'ler için önemlidir.
//Bir slug, genellikle aşağıdaki özelliklere sahiptir:
//Boşluklar yerine tireler (-) kullanır.
//Küçük harflerle yazılır.
//Özel karakterler kaldırılır veya değiştirilir.
//Örneğin, "Hello World!" başlıklı bir blog yazısı için uygun bir slug "hello-world" olabilir.

/* -------------------------------------------------------------------------- */
//? Category Controller:

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Catogrys"]
        #swagger.summary = "List Category"
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

    const data = await res.getModelList(Category);

    if (data) {
      const categoryList = createCategories(data);
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Category),
        categoryList,
      });
    }
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    console.log(req.body);

    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const cat = await new Category(categoryObj);

    try {
      await cat.save();
      res.status(200).send({
        message: "okey",
        cat,
      });
    } catch (error) {
      res.status(404).send({
        message: "Error saving category",
        error: error.message,
      });
    }
  },

  //! /:id -> GET
  read: async (req, res) => {},

  //! /:id -> PUT / PATCH
  update: async (req, res) => {},

  //! /:id -> DELETE
  delete: async (req, res) => {},
};
