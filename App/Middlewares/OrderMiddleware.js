const { response } = require("express");
const { request } = require("express");

const printOrderUrlMiddleware = (request, response, next) =>{
    console.log(`Request Order URL is ${request.url}`);
    next();
}

module.exports = { printOrderUrlMiddleware }