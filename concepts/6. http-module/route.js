
const http = require('http');

// http://localhost:3000/
const server = http.createServer((req,res) => {

    const url = req.url;
    
    if(url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Home Page")
    }
    else if(url === '/projects'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Projects Page")
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("This page can not be found!")
    }
})


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is mow listening to port ${PORT}`);
    
})