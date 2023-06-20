const createError = require('http-errors');
const mongoose = require('mongoose');

const Item = require('../Models/Item.model');

module.exports = {
  getAllItems: async (req, res, next) => {
    try {
      const results = await Item.find({}, { __v: 0 });
      // const results = await Item.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Item.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewItem: async (req, res, next) => {
    try {
      const item = new Item(req.body);
      const result = await item.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const item = new Item({
    name: req.body.name,
    price: req.body.price
  });
  item
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findItemById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const item = await Item.findById(id);
      // const item = await Item.findOne({ _id: id });
      if (!item) {
        throw createError(404, 'Item does not exist.');
      }
      res.send(item);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Item id'));
        return;
      }
      next(error);
    }
  },

  updateAItem: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Item.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Item does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Item Id'));
      }

      next(error);
    }
  },

  deleteAItem: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Item.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Item does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Item id'));
        return;
      }
      next(error);
    }
  }
};