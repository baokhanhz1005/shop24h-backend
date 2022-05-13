

const express = require("express");

// const app = express();

const { printProductTypeUrlMiddleware } = require("../Middlewares/ProductTypeMiddleware");

const {createProductType , getAllProductType, getProductTypeByID, updateProductTypeByID, deleteProductTypeByID} = require("../Controllers/ProductTypeController")

const router = express.Router();

router.post("/product_types" , printProductTypeUrlMiddleware , createProductType);

router.get("/product_types" , printProductTypeUrlMiddleware, getAllProductType);

router.get("/product_types/:productTypeId" , printProductTypeUrlMiddleware, getProductTypeByID);

router.put("/product_types/:productTypeId" , printProductTypeUrlMiddleware, updateProductTypeByID);
    
router.delete("/product_types/:productTypeId", printProductTypeUrlMiddleware, deleteProductTypeByID);

module.exports = router;