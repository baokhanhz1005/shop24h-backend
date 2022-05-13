
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
})) 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
next(); 
});


const port = process.env.PORT || 8000;;

const productTypeModel = require("./App/Models/ProductType");
const productModel = require("./App/Models/Product");
const customerModel = require("./App/Models/Customer");


const ProductTypeRouter = require("./App/Routers/ProductTypeRouter");
const ProductRouter = require("./App/Routers/ProductRouter");
const CustomerRouter = require("./App/Routers/CustomerRouter");
const OrderRouter = require("./App/Routers/OrderRouter");
                    // mongodb://localhost:27017/CRUD_shop24h
                    // mongodb+srv://shop24h-baokhanh:!23456@shop24h-db.p3xqp.mongodb.net/shop24h-baokhanh?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://shop24h-baokhanh:!23456@shop24h-db.p3xqp.mongodb.net/shop24h-baokhanh?retryWrites=true&w=majority", error =>{
    if(error) throw error;
    console.log("Successfully connected");
})




app.get("/", (request, response) =>{
    response.json({
        message: "Hello devcamp120, this is a CRUD shop24h project"
    })
})

app.use("/", ProductTypeRouter);
app.use("/", ProductRouter);
app.use("/", CustomerRouter);
app.use("/", OrderRouter);

app.listen(port , () =>{
    console.log(`App using port ${port}`)
})
