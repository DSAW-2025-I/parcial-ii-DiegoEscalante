const express = require("express");
const serverless = require("serverless-http");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome! To see a product's info, use the route /products/:id"
    });
});


let products = [
    {
        id: 1, 
        name: "water",
        price: 4000
    },
    {
        id: 2,
        name: "pepsi",
        price: 4500
    }
];

app.post('/products', (req, res) => {
    const {id, name, price} = req.body;
    if (products.some(product => product.id === id)) {
        res.status(400).json({ error: "A product with the same id already exists!"});
    }
    if (!id || !name || !price) {
        res.status(400).json({ error: "Missing data. A product needs id, name, and price"})
    }
    const newProduct = {id, name, price};
    product.push(newProduct);
    res.status(201).json(newProduct);
})

app.get("/products/:id", (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id===productId);
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