
const express = require("express");

const app = express();

// root route
app.get("/", (req, res) => {
    res.send("Welcome to our home page")
})

// get all products
app.get('/products', (req, res) => {
    const products = [
        {
            id : 1,
            label : "Product 1"
        },
         {
            id : 2,
            label : "Product 2"
        },
         {
            id : 3,
            label : "Product 3"
        }
    ]
    res.json(products)
})

// get product by id example of dynamic routing
app.get('/products/:id', (req, res) => {
    
    const productId = parseInt(req.params.id);
    
    const products = [
        {
            id : 1,
            label : "Product 1"
        },
         {
            id : 2,
            label : "Product 2"
        },
         {
            id : 3,
            label : "Product 3"
        }
    ]

    const getSingleProduct = products.find(product => product.id === productId)

    if(getSingleProduct){
        res.json(getSingleProduct);
    }
    else{
        res.status(400).json("Product not found");
    }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is now running at ${PORT}`)
})