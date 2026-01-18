require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');
const productRoutes = require('./routes/product-routes');
const bookRoutes = require("./routes/book-routes");

const app = express();


// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((e) => console.log(e));


// use middlewares
app.use(express.json());

// define routes
app.use('/products', productRoutes);
app.use("/reference", bookRoutes)

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is now running at port ${PORT}`);
})