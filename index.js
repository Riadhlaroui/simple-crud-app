const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//Get All Products
app.get('/api/products', async(req, res) => {
    try {
        const product = await Product.find();

        if(!product) return res.status(404).json({message: 'Products not found.'});

        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


//Get a product by its Id 
app.get('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product) return res.status(404).json({message: 'Product not found.'});

        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


//Updaate a Product
app.put('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) return res.status(404).json({message: 'Product not found.'});

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//Delete a product
app.delete('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) return res.status(404).json({message: 'Product not found.'});
        res.status(200).json({message: "Product deleted successfully."});

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


//Post a product to the DB
app.post('/api/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


//Connect to mangoDB 
mongoose.connect("mongodb+srv://admin:1w3eov6xverXGWmD@backenddb.fiwny.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
.catch((error) => {
    console.error("Failed to connect to database:", error.message);
});
