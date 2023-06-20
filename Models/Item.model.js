const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    }
});

const Item = mongoose.model('item',ItemSchema);

module.exports = Item;