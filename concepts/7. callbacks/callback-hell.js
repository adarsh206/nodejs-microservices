
const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err){
        console.log("Error reading file", err);
        return;
    }
    console.log(data)

    const modifyFileData = data.toUpperCase();

    fs.writeFile('output.txt', modifyFileData, (err) => {
        if(err){
            console.log("Error writing file", err);
            return;
        }

        console.log("data written to the new file");

        fs.readFile('output.txt', 'utf8', (err, data) => {
            if(err){
                console.log("Error while reading file", err);
                return;
            }

            console.log(data);
        })
    })
})