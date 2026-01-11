require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();


// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDn connected successfully"))
    .catch((e) => console.log(e));


// use middlewares
app.use(express.json());

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is now running at port ${PORT}`);
})