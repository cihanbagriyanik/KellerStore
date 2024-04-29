"use strict";
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const filters = req.user?.isAdmin ? {} : { _id: req.user._id };
    const data = await res.getModelList(User, filters);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User, filters),
      data,
    });
  },

  create: async (req, res) => {
    req.body.isActive = true;
    req.body.isBusiness = req.body.isBusiness || false;
    req.body.isPremium = req.body.isPremium || false;
    const data = await User.create(req.body);
    const tokenData = await Token.create({
      userId: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });
    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
    });
  },

  read: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    const data = await User.findOne(filters);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    req.body.isAdmin = req.user?.isAdmin ? req.body.isAdmin : false;
    const data = await User.updateOne(filters, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await User.findOne(filters)
    });
  },

  delete: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };
    const data = await User.deleteOne(filters);
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
