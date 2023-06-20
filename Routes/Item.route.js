 const express = require('express');
 const router = express.Router();

 const ItemController = require('../Controllers/Item.Controller');
 
//Get  all items of list
router.get('/',ItemController.getAllItems);

// create items 
router.post('/',ItemController.createNewItem);

// get a item by id 
router.get('/:id',ItemController.findItemById);

// update a item by id 
router.patch('/:id',ItemController.updateAItem);

// delete a item by id  
router.delete('/:id',ItemController.deleteAItem);

 module.exports = router;