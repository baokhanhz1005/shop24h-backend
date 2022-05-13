
const { request } = require("express");
const { response } = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");

const orderModel = require("../Models/Order");
const customerModel = require("../Models/Customer")

const createOrder = (request, response) =>{
    let customerId = request.params.customerId;

    let orderDate = request.body.orderDate;
    let shipDate = request.body.shipDate;
    let note = request.body.note;
    let cost = request.body.cost;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid"
        })
    }

    orderModel.create({
        _id: mongoose.Types.ObjectId(),
        orderDate: orderDate,
        shipDate: shipDate,
        note: note,
        cost: cost,
        timeCreated: timeCreated,
        timeUpdated: timeUpdated
    }, (error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal server ERROR",
                message: error.message
            })
        }else{
            customerModel.findByIdAndUpdate(customerId, {
                $push: {orders: data._id}
            }, (err) =>{
                if(err){
                    return response.status(500).json({
                        status: "Internal Server ERROR",
                        message: err.message
                    })
                }else{
                    return response.status(201).json({
                        status: "Success",
                        data: data
                    })
                }
            })
        }
    })
}

const getAllOrder = (request, response) =>{
    orderModel.find((error, data) =>{
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

const getAllOrderOfCustomer = (request, response) =>{
    let customerId = request.params.customerId;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid"
        })
    }

    customerModel.findById(customerId)
    .populate("orders")
    .exec((error, data) =>{
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

const getOrderByID = (request, response) =>{
    let orderId = request.params.orderId;

    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "orderId invalid"
        })
    }

    orderModel.findById(orderId, (error, data) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Sercer ERROR",
                message: error.message
            })
        }else{
            if(data){
                return response.status(200).json({
                    status: "Success",
                    data: data
                })
            }else{
                return response.status(400).json({
                    status: "Not Found"
                })
            }
        }
    })
}

const updateOrderByID = (request, response) =>{
    let orderId = request.params.orderId;

    let orderDate = request.body.orderDate;
    let shipDate = request.body.shipDate;
    let note = request.body.note;
    let cost = request.body.cost;
    let timeCreated = request.body.timeCreated;
    let timeUpdated = request.body.timeUpdated;

    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "orderId invalid"
        })
    }

    orderModel.findByIdAndUpdate(orderId, {
        orderDate: orderDate,
        shipDate: shipDate,
        note: note,
        cost: cost,
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

const deleteOrderByID = (request, response) =>{
    let customerId = request.params.customerId;
    let orderId = request.params.orderId;

    if(!mongoose.Types.ObjectId.isValid(customerId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "customerId invalid, please check again !"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return response.status(400).json({
            status: "Bad Request",
            message: "orderId invalid, please check again !"
        })
    }

    orderModel.findByIdAndDelete(orderId,(error) =>{
        if(error){
            return response.status(500).json({
                status: "Internal Server ERROR",
                message: error.message
            })
        }else{
            customerModel.findByIdAndUpdate(customerId, {
                $pull: {orders: orderId}
            }, (err) =>{
                if(err){
                    return response.status(500).json({
                        status: "Internal Server ERROR",
                        message: err.message
                    })
                }else{
                    return response.status(204).json()
                }
            })
        }
    })
}



module.exports = {
    createOrder,
    getAllOrder,
    getAllOrderOfCustomer,
    getOrderByID,
    updateOrderByID,
    deleteOrderByID
}