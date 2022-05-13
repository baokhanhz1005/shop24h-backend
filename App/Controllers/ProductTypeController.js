
const { response } = require("express");
const { request } = require("express");
const mongoose = require("mongoose");

const ProductTypeModel = require("../Models/ProductType");

const createProductType = (request, response) =>{
    let name = request.body.name;
    let description = request.body.description;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;


    if(!name){
        return response.status(400).json({
            status: "Bad Request",
            message: "name is required, please check again !"
        })
    }
    ProductTypeModel.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        description: description,
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
                status: "Create Success",
                data: data
            })
        }
    })
}

const getAllProductType = (request, response) =>{
    ProductTypeModel.find((error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
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

const getProductTypeByID = (request, response) =>{
    let productTypeId = request.params.productTypeId;

    if( !mongoose.Types.ObjectId.isValid(productTypeId) ){
        return response.status(400).json({
            status: "Bad Request",
            message: "productTypeId invalid"
        })
    }
    ProductTypeModel.findById(productTypeId, (error, data) =>{
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
                    status: "Not Found",
                    message: "Data Not Found"
                })
            }
        }
    })
}

const updateProductTypeByID = (request, response) =>{
    let name = request.body.name;
    let description = request.body.description;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    let productTypeId = request.params.productTypeId;

    if(!mongoose.Types.ObjectId.isValid(productTypeId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "productTypeId invalid"
        })
    }
    ProductTypeModel.findByIdAndUpdate(productTypeId, {
        name: name,
        description: description,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    } ,(error, data) =>{
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
                    status: "Not Found",
                    message: "Data Not Found " 
                })
            }
        
        }
    })
}

const deleteProductTypeByID = (request, response) =>{
    let productTypeId = request.params.productTypeId;

    if(!mongoose.Types.ObjectId.isValid(productTypeId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "productTypeId invalid"
        })
    }

    ProductTypeModel.findByIdAndDelete(productTypeId, (error) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            return response.status(204).json()
        }
    })
}

module.exports = {
    createProductType,
    getAllProductType,
    getProductTypeByID,
    updateProductTypeByID,
    deleteProductTypeByID
}