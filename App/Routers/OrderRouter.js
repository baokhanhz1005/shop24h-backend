
const express = require("express");

const { printOrderUrlMiddleware } = require("../Middlewares/OrderMiddleware")

const { createOrder , getAllOrder, getAllOrderOfCustomer, getOrderByID, updateOrderByID, deleteOrderByID} = require("../Controllers/OrderController")

const router = express.Router();

router.post("/customers/:customerId/orders", printOrderUrlMiddleware, createOrder);

router.get("/orders", printOrderUrlMiddleware, getAllOrder);

router.get("/customers/:customerId/orders" , printOrderUrlMiddleware, getAllOrderOfCustomer);

router.get("/orders/:orderId", printOrderUrlMiddleware, getOrderByID);

router.put("/orders/:orderId", printOrderUrlMiddleware, updateOrderByID);

router.delete("/customers/:customerId/orders/:orderId", printOrderUrlMiddleware, deleteOrderByID);


module.exports = router;