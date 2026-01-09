

const { log } = require("console");
const fs = require("fs");
const path = require("path");


const dataFolder = path.join(__dirname, 'data');
console.log(dataFolder);

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("data folder created");
}

const filePath = path.join(dataFolder, 'example.txt');

// sync way of creating the file
fs.writeFileSync(filePath, "Hello from NodeJs");
console.log("file created successfully!")

// sync way of reading file 
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File Content:", readContentFromFile);

//sync way of appending content in a file
fs.appendFileSync(filePath, '\nThis is a new line added to that file.');
console.log('new file content added');


// async way of creating a file
const asyncFilePath = path.join(dataFolder, 'async-example.txt');
fs.writeFile(asyncFilePath, "Hello, Async node js", (err) =>{
    if(err) throw err;
    console.log('Async file is created successfully!');

    // async way of reading a file
    fs.readFile(asyncFilePath, "utf8", (err, data) => {
        if(err) throw err;
        console.log("Async file content:", data);

    // async way of appending content to a file
    fs.appendFile(asyncFilePath, '\nThis is another line added', (err) => {
        if(err) throw err;
        console.log("New line added to async file");

        fs.readFile(asyncFilePath, "utf8", (err, updatedData) => {
        if(err) throw err;
        console.log("Async file content:", updatedData);
    
        })
     })  
  })
})
