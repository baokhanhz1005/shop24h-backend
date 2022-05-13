
const { response } = require("express");
const { request } = require("express");
const mongoose = require("mongoose");

const customerModel = require("../Models/Customer");

const createCustomer = (request, response) =>{
    let fullName = request.body.fullName;
    let phone = request.body.phone;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let country = request.body.country;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!fullName && !phone && !email){
        return response.status(400).json({
            status: "Bad Request",
            message: "fullName/phone/email is required"
        })
    }

    customerModel.create({
        _id: mongoose.Types.ObjectId(),
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        country: country,
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

const getAllCustomer = (request, response) =>{
    customerModel.find((error, data) =>{
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

const getCustomerByID = (request, response) =>{
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid"
        })
    }

    customerModel.findById(customerId, (error, data) =>{
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
                    message: "Data not found"
                })
            }
        }
    })
}

const updateCustomerByID = (request, response) => {
    let customerId = request.params.customerId;

    let fullName = request.body.fullName;
    let phone = request.body.phone;
    let email = request.body.email;
    let address = request.body.address;
    let city = request.body.city;
    let country = request.body.country;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid"
        })
    }

    customerModel.findByIdAndUpdate(customerId , {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        country: country,
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

const deleteCustomerByID = (request, response) =>{
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid"
        })
    }

    customerModel.findByIdAndDelete(customerId, (error) =>{
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
    createCustomer,
    getAllCustomer,
    getCustomerByID,
    updateCustomerByID,
    deleteCustomerByID
}