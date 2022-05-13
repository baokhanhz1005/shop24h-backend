
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shipDate: {
        type: Date
    },
    note: {
        type: String
    },
    orderDetail: [],
    cost: {
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

module.exports = mongoose.model("order", orderSchema);