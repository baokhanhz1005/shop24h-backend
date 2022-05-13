const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    _id:{
        type:  mongoose.Types.ObjectId
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    types: {
        type: mongoose.Types.ObjectId,
        ref: "Product_Type"
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("product", ProductSchema);