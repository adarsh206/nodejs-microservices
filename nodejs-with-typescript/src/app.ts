import express, {Express, Request, Response} from "express";


const app : Express = express();
const PORT = 3000;



app.use(express.json());

//middleware -> add startTime to request
app.use()


// req -> Request<p, ResBody, ReqBody, ReqQuery, Locals>
// res -> Response<ResBody, Locals>
// res -> res.send(), res.json(), res.status()  
app.get("/", (req : Request, res : Response) => {
    res.send("Hello World from Typescript with express")
})


app.listen(PORT, () => {
    console.log(`Server is now running at port ${PORT}`);
})
