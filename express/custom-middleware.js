
const express = require("express");

const app = express();


const requestTimestampLogger = ((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`${timestamp} from ${req.method} to ${req.url}`);

    next();
})

app.use(requestTimestampLogger);

app.get("/", (req, res) => {
    res.send("Home Page");
})


app.get("/custom", (req, res) => {
    res.send("Hello Custom Middleware");
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is now running at ${PORT}`)
})