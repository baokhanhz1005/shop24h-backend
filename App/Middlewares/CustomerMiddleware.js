const { response } = require("express");
const { request } = require("express");

const printCustomerUrlMiddleware = (request, response, next) =>{
    console.log(`Request Customer URL is: ${request.url}`)
    next()
}

module.exports = { printCustomerUrlMiddleware }