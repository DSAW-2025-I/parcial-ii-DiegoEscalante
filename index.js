const express = require("express");
const serverless = require("serverless-http");
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome! To see a product's info, use the route /products/:id"
    });
});


const products = {
    "1": {
        id: 1, 
        name: "water",
        price: 4000
    },
    "2": {
        id: 2,
        name: "pepsi",
        price: 4500
    }
};

app.get("/products/:id", (req, res) => {
    try {
        const product = products[req.params.id];
        if (product) {
            res.status(200).json(product);
        } else {
        res.status(404).json({ error: "Product not found with the given ID" });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/products", (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = app;
module.exports.handler = serverless(app);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", port);
});