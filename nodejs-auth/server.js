require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require("./routes/auth-routes");


// database connection
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is now listening at ${PORT}`);
})