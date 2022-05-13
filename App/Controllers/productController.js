
const { response } = require("express");
const { request } = require("express");
const { type } = require("express/lib/response");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const ProductModel = require("../Models/Product");

const createProduct = (request, response) =>{
    let name = request.body.name;
    let description = request.body.description;
    let imageUrl = request.body.imageUrl;
    let buyPrice = request.body.buyPrice;
    let promotionPrice = request.body.promotionPrice;
    let amount = request.body.amount;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!name && !buyPrice && !imageUrl && !promotionPrice){
        return response.status(400).json({
            status: "Bad Request",
            message: "name/buyPrice/imageUrl/promotionPrice is required"
        })
    }

    ProductModel.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description: description,
        imageUrl: imageUrl,
        type:type,
        buyPrice: buyPrice,
        promotionPrice: promotionPrice,
        amount: amount,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    }, (error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            return response.status(201).json({
                status: "Created",
                data: data
            })
        }
    })
}

const getAllProduct = (request, response) =>{ //GHEP CHUNG LIMIT O PHIA BEN DUOI, KHONG XAI HAM NAY, SU DUNG HAM GET PRODUCT BY LIMIT
    ProductModel.find((error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            if(data){
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            }else{
                return response.status(404).json({
                    status: "Not Found"
                })
            }
        }
    })
}

const getProductByID = (request, response) =>{
    let productId = request.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "productId invalid"
        })
    }

    ProductModel.findById(productId, (error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            if(data){
                return response.status(200).json(
                    data
                )
            }else{
                return response.status(404).json({
                    status: "Not Found",
                    message: "Data Not Found"
                })
            }
        }
    })
}

const updateProductByID = (request, response) =>{
    let productId = request.params.productId;

    let name = request.body.name;
    let description = request.body.description;
    let imageUrl = request.body.imageUrl;
    let buyPrice = request.body.buyPrice;
    let promotionPrice = request.body.promotionPrice;
    let amount = request.body.amount;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "productId invalid"
        })
    }

    ProductModel.findByIdAndUpdate(productId, {
        name: name,
        description: description,
        imageUrl: imageUrl,
        buyPrice: buyPrice,
        promotionPrice: promotionPrice,
        amount: amount,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    }, (error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            if(data){
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            }else{
                return response.status(404).json({
                    status: "Not Found"
                })
            }
        }
    })
}

const deleteProductByID = (request, response) =>{
    let productId = request.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "productId invalid"
        })
    }

    ProductModel.findByIdAndDelete(productId, (error) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            return response.status(204).json();
        }
    })
}

const getProductByLimit = (request, response) =>{
    let limit = parseInt(request.query.limit);
   
   if(!limit){  //GET ALL

    const { name, type, minPrice, maxPrice } = request.query;
    const condition = {};

    if(name){
        const regex = new RegExp(`${name}`)
        condition.name = regex;
    }
    if(type){
        const regex = new RegExp(`${type}`)
        condition.type = regex;
    }

    if(minPrice) {
        condition.buyPrice = {
            ...condition.buyPrice,
            $gte: minPrice
        }
    }

    if(maxPrice) {
        condition.buyPrice = {
            ...condition.buyPrice,
            $lte: maxPrice
        }
    }

    ProductModel.find(condition,(error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            if(data){
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            }else{
                return response.status(404).json({
                    status: "Not Found"
                })
            }
        }
    })
   }else{   //GET BY LIMIT

       ProductModel.find().limit(limit).exec((error, data) =>{
           if(error){
               return response.status(500).json({
                   status: "Internal Server Error",
                   message: error.message
               })
           }else{
               return response.status(200).json({
                   status: "Success",
                   data: data
               })
           }
       })
   }
   

}

module.exports = {
    createProduct,
    getAllProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    getProductByLimit
}