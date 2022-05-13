const { response } = require("express");
const { request } = require("express");

const printProductUrlMiddleware = (request, response, next) =>{
    console.log(`Request Product URL is: ${request.url}`);
    next()
}

module.exports = { printProductUrlMiddleware }