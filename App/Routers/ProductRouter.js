

const express = require("express");

const { printProductUrlMiddleware } = require("../Middlewares/ProductMiddleware");

const { createProduct, getAllProduct, getProductByID, updateProductByID , deleteProductByID, getProductByLimit } = require("../Controllers/productController")
 
const router = express.Router();


router.post("/products" , printProductUrlMiddleware , createProduct);

// router.get("/products" , printProductUrlMiddleware , getAllProduct);

router.get("/products" , printProductUrlMiddleware , getProductByLimit);

router.get("/products/:productId", printProductUrlMiddleware, getProductByID);

router.put("/products/:productId", printProductUrlMiddleware, updateProductByID);

router.delete("/products/:productId", printProductUrlMiddleware, deleteProductByID);


module.exports = router;
