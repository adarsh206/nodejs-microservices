
const express = require("express");

const app = express();

// middleware function have access to req and res and can also modify it nad have next function to call in the last to run or call the next function
// define middleware function
const myFirstMiddleware = (req, res, next) => {
    console.log('this first middleware will run on every request');
    
    next();
}

app.use(myFirstMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/about", (req, res) => {
    res.send("About Page")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is now running at ${PORT}`)
})