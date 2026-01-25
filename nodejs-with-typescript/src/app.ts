import express, {Express, Request, Response, NextFunction} from "express";
import { IUser, User } from "./models/User";


const app : Express = express();
const PORT = 3000;



app.use(express.json());

interface CustomRequest extends Request {
    startTime? : number
}

//middleware -> add startTime to request
app.use((req: CustomRequest, res : Response, next : NextFunction) => {
    req.startTime = Date.now();
    next();
})


// req -> Request<p, ResBody, ReqBody, ReqQuery, Locals>
// res -> Response<ResBody, Locals>
// res -> res.send(), res.json(), res.status()  
app.get("/", (req : Request, res : Response) => {
    res.send("Hello World from Typescript with express")
})

app.get("/users", async(req : Request, res : Response) => {
    try {
        
        const users : IUser[] = await User.find();
        res.status(200).json({message : "User fetched successfully"});

    } catch (error) {
        res.status(400).json({message : "Some Error Occured!"})
    }
})


// post route -> new user -> name, email -> req.body
// -> /user/:id?name -> Request <{}, {}, {}, {}, {}>

interface User {
    name : string,
    email : string
}

app.post("/user", (req: Request<{}, {}, User>, res: Response) => {
    const {name, email} = req.body;
    res.json({
        message : `User created ${name} with email ${email}`,
    })
})

// users based on id
app.get('/users/:id', (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;
    res.json({
        useId : id,
        message : "User fetched successfully"
    })
})
app.listen(PORT, () => {
    console.log(`Server is now running at port ${PORT}`);
})
