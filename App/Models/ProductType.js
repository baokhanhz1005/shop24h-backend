

const mongoose = require('mongoose');

const productTypeSchema = mongoose.Schema({
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
   timeCreated: {
       type: Date,
       default: Date.now()
   },
   timeUpdated: {
    type: Date,
    default: Date.now()
}
})

module.exports = mongoose.model("Product_Type" , productTypeSchema)