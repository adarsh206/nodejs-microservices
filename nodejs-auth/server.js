require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');


// database connection
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is now listening at ${PORT}`);
})