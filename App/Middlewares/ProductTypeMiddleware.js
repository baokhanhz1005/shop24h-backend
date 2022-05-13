
const printProductTypeUrlMiddleware = (request, response, next) =>{
    console.log(`Request ProductType URL: ${request.url}`);
    next();
}

module.exports = {printProductTypeUrlMiddleware}