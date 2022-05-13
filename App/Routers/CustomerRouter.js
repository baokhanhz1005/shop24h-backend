
const express = require("express");

const { printCustomerUrlMiddleware } = require("../Middlewares/CustomerMiddleware")

const { createCustomer, getAllCustomer, getCustomerByID , updateCustomerByID, deleteCustomerByID } = require("../Controllers/CustomerController")

const router = express.Router();

router.post("/customers", printCustomerUrlMiddleware, createCustomer );

router.get("/customers", printCustomerUrlMiddleware, getAllCustomer);

router.get("/customers/:customerId", printCustomerUrlMiddleware, getCustomerByID);

router.put("/customers/:customerId", printCustomerUrlMiddleware, updateCustomerByID);

router.delete("/customers/:customerId", printCustomerUrlMiddleware, deleteCustomerByID)

module.exports = router;